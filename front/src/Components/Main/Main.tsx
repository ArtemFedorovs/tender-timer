import styles from './Main.module.css'; // Import css modules stylesheet as styles
import {OfferType} from '../../Utils/Types';
import Timer from '../Timer/Timer';

type MainPropType = {
    timeLeft: number,
    tenderInfo: {
        title: string, 
        id: number,
        auctionStep: number, 
        timerStepSec:  number,
        phase: {
            whoseTurnIndex: number,
            endOfphaseTimeSec: number,
        }, 
        offers: [OfferType] | null
    } | null,
}

function Main({timeLeft, tenderInfo}: MainPropType) {
    const offers = tenderInfo?.offers;

    let targetPrice: number = 0; //Определяем целевую цену шага аукциона
    if (tenderInfo?.offers) {
    targetPrice = ( +tenderInfo.offers.reduce(  //ищем минимальную цену предложения
        (minPrice, offer) => { return (offer.price < minPrice) ? offer.price : minPrice }, 
        tenderInfo.offers[0].price
    ) 
    - +tenderInfo.auctionStep ) //Вычитаем из минимальной цены предложения шаг аукциона 
    };

    return (
        <>
            { offers && <main className={styles.main}>
                <h4>Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в таблице:</h4>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.nameCell}>Ход</th>
                            {offers.map((offer, index) => 
                                <th key={offer.id} className={styles.timerCell}>
                                    {index == tenderInfo.phase.whoseTurnIndex && <Timer time = {timeLeft}/>}
                                </th>
                            )}
                        </tr>
                        <tr>
                            <th className={styles.nameCell}>Параметры и требования</th>
                            {offers.map((offer: OfferType)=><th key={offer.id} className={styles.nameCell}>{offer.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.greyRow} >
                            <th className={styles.tBodyCell}>Наличие комплекса мероприятий, повышающих стандарты качества изготовления</th>
                            {offers.map((offer: OfferType)=><th key={offer.id} className={styles.tBodyCell}>{offer.qualityMS}</th>)}
                        </tr>
                        <tr>
                            <th className={styles.tBodyCell}>Срок изготовления, дней</th>
                            {offers.map((offer: OfferType)=><th key={offer.id} className={styles.tBodyCell}>{offer.prodTimeD}</th>)}
                        </tr>
                        <tr className={styles.greyRow}>
                            <th className={styles.tBodyCell}>Гарантийные обязательства, мес</th>
                            {offers.map((offer: OfferType)=><th key={offer.id} className={styles.tBodyCell}>{offer.warrantyMon}</th>)}
                        </tr>
                        <tr>
                            <th className={styles.tBodyCell}>Условия оплаты</th>
                            {offers.map((offer: OfferType)=><th key={offer.id} className={styles.tBodyCell}>{offer.paymentTerms}</th>)}
                        </tr>
                        <tr className={styles.greyRow}>
                            <th className={styles.tBodyCell}>Стоимость изготовления лота, руб. (без НДС)</th>
                            {offers.map((offer: OfferType)=>
                                <th key={offer.id} className={styles.tBodyCell}>
                                    <div className={styles.priceText}>{offer.price}</div>
                                    <div className={styles.stepText}>{tenderInfo.auctionStep || "-"}</div>
                                    <div className={styles.targetPriceText}>{targetPrice}</div>
                                </th>
                            )}
                        </tr>
                        <tr>
                            <th className={styles.tBodyCell}>Действия</th>
                            {offers.map((offer)=><th key={offer.id} className={styles.tBodyCell}></th>)}
                        </tr>
                    </tbody>
                    </table>
            </main>}
        </>
    )              
}

export default Main;
