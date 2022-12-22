export type OfferType = {
    id: number,
    name: string,
    qualityMS: string,
    prodTimeD: string,
    warrantyMon: string,
    paymentTerms: string,
    price: number
  } 

  export  type  TenderInfoType = {
    title: string, 
    id: number,
    auctionStep: number, 
    timerStepSec:  number,
    phase: {
        whoseTurnIndex: number,
        endOfphaseTimeSec: number,
    }, 
    offers: [OfferType] | null
}