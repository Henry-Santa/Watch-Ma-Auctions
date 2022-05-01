import * as HyJs from './Hypixel.js'

const Hypixel = new HyJs.Hypixel();
const dataDiv = document.getElementById('ended-auctions');

class player{
    constructor(uuid){
        this.uuid = uuid;
        this.setup();
        this.totalUpdates = 0;
    }
    async setup(){
        this.skyblock = await Hypixel.createHypixelSkyblock();
        this.auctionHouse = await this.skyblock.getAuctionHouse();
        
        this.recents = [];
        //while (this.totalUpdates < 10){
            await this.update();
            this.totalUpdates++;
            await setTimeout(10000);

        //}
    }
    async update(){
        dataDiv.innerHTML = '';
        console.clear();
        let endedAuctions = await this.auctionHouse.getRecentlyEndedAuctions();
        Object.keys(endedAuctions).forEach(async (key) => {
            if(endedAuctions[key].auctioneer == this.uuid){
                this.recents.push(endedAuctions[key]);
            }
        });
        this.recents.forEach(async (auction) => {
            makeNewWidget(auction);
        });
    }
    
}

new player(HyJs.util.nameToUuid("DuckyHenry"));

/**
 * @param {HyJs.hypixelAuction} auction
 */
function makeNewWidget(auction){
    let div = document.createElement('div');
    div.className = 'auction-widget';
    div.innerHTML = `
        <div class="auction-widget-header">
            <img src="https://crafatar.com/avatars/${auction.auctioneer}?overlay" class="auction-widget-header-avatar">
            <span class="auction-widget-header-name">${auction.auctioneer}</span>
        </div>
        <div class="auction-widget-content">
            <div class="auction-widget-content-item">
                <img src="https://crafatar.com/avatars/${auction.auctioneer}?overlay" class="auction-widget-content-item-avatar">
                <span class="auction-widget-content-item-name">${auction.item}</span>
            </div>
            <div class="auction-widget-content-item">
                <span class="auction-widget-content-item-name">${auction.amount}</span>
            </div>
        </div>
    `;
    dataDiv.appendChild(div);
}