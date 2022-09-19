interface AssignmentSDK {
    init: () => Promise<void>
    trackEvent: (
        category: string,
        attribute?: Record<string, string>,
    ) => Promise<void>
}

const AssignmentSDK = (): AssignmentSDK => {
    const init = async () => {
        throw Error('not implemented')
    }

    const trackEvent = async (
        category: string,
        attribute?: Record<string, string>,
    ) => {
        throw Error('not implemented')
    }

    return {
        init,
        trackEvent,
    }
}

export { AssignmentSDK }