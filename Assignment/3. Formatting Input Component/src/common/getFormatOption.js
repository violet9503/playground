import {
  FORMAT_TYPE_PHONE,
  FORMAT_OPTION_MOBILE,
  FORMAT_OPTION_HOME,
  FORMAT_TYPE_CREDITCARD,
  FORMAT_TYPE_DATE,
  FORMAT_OPTION_YEAR_UNIT,
  FORMAT_OPTION_DATE_UNIT,
  FORMAT_TYPE_TIME,
  FORMAT_OPTION_TIME_UNIT,
  FORMAT_TYPE_THOUSAND,
  FORMAT_OPTION_WAN,
  FORMAT_OPTION_WAN_UNIT,
  FORMAT_OPTION_DOLLAR_UNIT,
} from "./constants";

export const getFormatOption = (type, options) => {
  switch (type) {
    case FORMAT_TYPE_PHONE: {
      if (options === FORMAT_OPTION_MOBILE) {
        return {
          numericOnly: true,
          blocks: [0, 3, 0, 4, 4],
          delimiters: ["(", ")", "-"],
        };
      }

      if (options === FORMAT_OPTION_HOME) {
        return {
          numericOnly: true,
          blocks: [0, 2, 0, 4, 4],
          delimiters: ["(", ")", "-"],
        };
      }
      break;
    }
    case FORMAT_TYPE_CREDITCARD: {
      return {
        numericOnly: true,
        blocks: [4, 4, 4, 4],
        delimiter: " ",
      };
    }
    case FORMAT_TYPE_DATE: {
      const blocks = options
        ? options.map(option => {
            if (option === "Y") return FORMAT_OPTION_YEAR_UNIT;

            if (option === "y" || option === "m" || option === "d") return FORMAT_OPTION_DATE_UNIT;

            return 0;
          })
        : [4, 2, 2];

      return {
        numericOnly: true,
        blocks,
        delimiter: "/",
      };
    }
    case FORMAT_TYPE_TIME: {
      const blocks = options
        ? options.map(option => {
            if (option === "h" || option === "m" || option === "s") return FORMAT_OPTION_TIME_UNIT;

            return 0;
          })
        : [2, 2, 2];

      return {
        numericOnly: true,
        blocks,
        delimiter: ":",
      };
    }
    case FORMAT_TYPE_THOUSAND: {
      const thousandBlocks =
        options === FORMAT_OPTION_WAN ? FORMAT_OPTION_WAN_UNIT : FORMAT_OPTION_DOLLAR_UNIT;

      return {
        numericOnly: true,
        thousandBlocks,
        delimiter: ",",
      };
    }
    default: {
      return {};
    }
  }
};
