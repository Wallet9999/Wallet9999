import type { Emitter } from 'mitt'
import mitt from 'mitt'

type Events = {
    // deposit
    onDeposit: string | void

    // withdrawal
    openWithdrawalSuccess: void

    // conversion
    openConversionSuccess: void

    // buy
    onFiat: void
}

const emitter: Emitter<Events> = mitt<Events>()

const useBus = (): { emitter: Emitter<Events> } => {
    return { emitter }
}

export { useBus }
