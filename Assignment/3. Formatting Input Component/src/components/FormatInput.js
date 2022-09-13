import { useCallback, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { getFormatOption } from "../common/getFormatOption";
import { SPECIAL_REGEXP, FORMAT_TYPE_CUSTOM } from "../common/constants";

const Input = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid #bbb;
  outline: none;
  box-sizing: border-box;
  font-size: 18px;
  padding: 5px 15px;
`;

const getValidBlocksCount = (blocks, inputLength) => {
  let count = 0;
  for (const block of blocks) {
    if (inputLength <= 0) break;

    count += 1;
    inputLength -= block;
  }

  return count;
};

export const FormatInput = ({
  type = FORMAT_TYPE_CUSTOM,
  typeOption = null,
  placeholder = "",
  ...customOption
}) => {
  const [inputValue, setValue] = useState(customOption.prefix ? customOption.prefix : "");
  const formatOption = useMemo(() => {
    const basicOption = type !== FORMAT_TYPE_CUSTOM ? getFormatOption(type, typeOption) : {};
    return {
      ...basicOption,
      ...customOption,
    };
  }, [type, typeOption, customOption]);

  const stripFormat = useCallback(
    (value, option) => {
      let result = value;
      const { prefix, blocks, delimiter, delimiters } = option;

      if (prefix) {
        result =
          value.slice(0, prefix.length) === prefix
            ? value.slice(prefix.length)
            : inputValue.slice(prefix.length);
      }

      if (blocks && (delimiter || delimiters)) {
        const delimiterRegExp = delimiter
          ? new RegExp(delimiter, "g")
          : new RegExp(
              delimiters
                .map(delimiter =>
                  SPECIAL_REGEXP.includes(delimiter) ? `\\${delimiter}` : delimiter
                )
                .join("|"),
              "g"
            );
        result = result.replace(delimiterRegExp, "");
      }

      return result;
    },
    [inputValue]
  );

  const applyFormat = useCallback((value, option) => {
    let result = value;
    const {
      prefix,
      uppercase,
      lowercase,
      numericOnly,
      blocks,
      delimiter,
      delimiters,
      thousandBlocks,
    } = option;

    if (uppercase) {
      result = result.toUpperCase();
    }

    if (lowercase) {
      result = result.toLowerCase();
    }

    if (numericOnly) {
      result = result.replace(/[^0-9]/g, "");
    }

    if (blocks && (delimiter || delimiters)) {
      const splitRegExp = new RegExp(blocks.reduce((a, b) => a + `(.{0,${b}})`, ""));
      const validBlocksCount = getValidBlocksCount(blocks, result.length);

      const splitedResult = result.split(splitRegExp).slice(1, validBlocksCount + 1);

      result = splitedResult.reduce((prevString, currentString, i) => {
        let currentDelemiter =
          delimiter || (delimiters.length > i ? delimiters[i] : delimiters[delimiters.length - 1]);

        if (i === splitedResult.length - 1) currentDelemiter = "";

        return prevString + currentString + currentDelemiter;
      }, "");
    }

    if (thousandBlocks) {
      const splitRegExp = new RegExp(`\\B(?=(\\d{${thousandBlocks}})+(?!\\d))`, "g");
      result = result.replace(splitRegExp, delimiter);
    }

    if (prefix) {
      result = prefix + result;
    }

    return result;
  }, []);

  const handleChange = useCallback(
    e => {
      const rawValue = stripFormat(e.target.value, formatOption);
      setValue(applyFormat(rawValue, formatOption));
    },
    [setValue, formatOption, stripFormat, applyFormat]
  );

  return <Input type="text" value={inputValue} onChange={handleChange} placeholder={placeholder} />;
};
