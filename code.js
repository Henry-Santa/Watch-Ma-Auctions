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



/**
 * @param {HyJs.hypixelAuction} auction
 */
function makeNewWidget(auction){
    let div = document.createElement('div');
    div.className = 'auction-widget';
    div.innerHTML = `
        <div class="auction-widget-header">
            <div class="auctioneer">
                ${auction.auctioneer}
            </div>
            <div class="auction-price">
                ${auction.price}
            </div>
            <div class="auction-name">
                ${auction.item}
            </div>
        </div>

    `;
    dataDiv.appendChild(div);
}
async function findPlayer(){
    const sb = new HyJs.HypixelSkyblock("");
    const ah = await sb.getAuctionHouse();
    const endedAuctions = await ah.getRecentlyEndedAuctions();
    let plyer = endedAuctions[Object.keys(endedAuctions)[0]].auctioneer;
    console.log(plyer);
    console.log(HyJs.util.uuidToName(plyer));
    var newPlayer = new player(player);
}
findPlayer();