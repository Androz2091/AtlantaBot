const Canvas = require("canvas"),
fortnite = require("fortnite-9812"),
fs = require("fs"),
CronJob = require("cron").CronJob,
Discord = require("discord.js");
const { resolve } = require("path");
// Register assets fonts
Canvas.registerFont(resolve("./assets/fonts/Burbank-Big-Condensed-Bold-Font.otf"), { family: "Burbank" });

const langList = fs.readdirSync("./languages/").map((f) => f.split(".")[0]);

const applyItemName = (canvas, text) => {
    const ctx = canvas.getContext("2d");
    // Declare a base size of the font
    let fontSize = 40;
    do {
        ctx.font = `${fontSize -= 5}px Burbank`;
    } while (ctx.measureText(text).width > 260);
    return ctx.font;
};

/**
 * Delete old png files
 */
async function deleteOldFiles(){
    langList.forEach((lang) => {
        let dateNow = new Date(),
        delDate = new Date(dateNow.setTime(dateNow.getTime() - 7 * 86400000)),
        days = delDate.getDate(),
        dd = (days < 10 ? "0" + days : days),
        months = delDate.getMonth() + 1,
        mm = (months < 10 ? "0" + months : months),
        yyyy = delDate.getFullYear(),
        fileName = dd + "." + mm + "." + yyyy,
        path = `./assets/img/fortnite/shop/${lang}/${fileName}.png`;
        if(fs.existsSync(path)) fs.unlinkSync(path);
    });
}

function getFileName(){
    let dateNow = new Date(),
    days = dateNow.getDate(),
    dd = (days < 10 ? "0" + days : days),
    months = dateNow.getMonth() + 1,
    mm = (months < 10 ? "0" + months : months),
    yyyy = dateNow.getFullYear();
    return dd + "." + mm + "." + yyyy;
}

/**
 * Check if there is an image to write
 * @param {object} client The Discord Client instance
 */
async function checkImage(client){
    return new Promise(async function(resolve, reject){
        langList.forEach(async (lang) => {
            const language = new(require(`../languages/${lang}.js`)),
            path = `./assets/img/fortnite/shop/${lang}/${getFileName()}.png`;
            if(!fs.existsSync(path)){
                await writeImage(client, language);
                resolve(true);
            } else {
                resolve(true);
            }
        });
    });
}
/**
 * Write a new image
 * @param {object} client The Discord Client instance
 * @param {object} language The language for the image
 */
async function writeImage(client, language){
    const fortniteClient = new fortnite.Client({ fnbrToken: client.config.apiKeys.fortniteFNBR });
    let shop = await fortniteClient.fnbrShop();
    let dateShop = new Date(shop.data.date),
    days = dateShop.getDate(),
    dd = (days < 10 ? "0" + days : days),
    months = dateShop.getMonth() + 1,
    mm = (months < 10 ? "0" + months : months),
    yyyy = dateShop.getFullYear(),
    imageName = dd + "." + mm + "." + yyyy;

    let dailyHeight = (shop.data.daily.length < 9 ? (Math.ceil(shop.data.daily.length / 2) * 297) : (Math.ceil(shop.data.daily.length / 3) * 297)),
    featuredHeight = (shop.data.featured.length < 9 ? (Math.ceil(shop.data.featured.length / 2) * 297) : (Math.ceil(shop.data.featured.length / 3) * 297)),
    canvas = ((shop.data.daily.length < 9 && shop.data.featured.length < 9) ? (shop.data.daily.length >= shop.data.featured.length ? Canvas.createCanvas(1220, 250 + dailyHeight) : Canvas.createCanvas(1220, 250 + featuredHeight)) : (shop.data.daily.length >= shop.data.featured.length ? Canvas.createCanvas(1220 + (297 * 2), 250 + dailyHeight) : Canvas.createCanvas(1220 + (297 * 2), 250 + featuredHeight))),
    ctx = canvas.getContext("2d");

    /* BACKGROUND */
    let background = await Canvas.loadImage("./assets/img/fortnite/shop/background.png");
    ctx.drawImage(background, 0, 0, 3268, 2027);
    // Draw title
    ctx.fillStyle = "#ffffff";
    ctx.font = "70px Burbank";
    ctx.textAlign = "center";
    ctx.fillText(language.get("FORTNITESHOP_HEADER"), canvas.width / 2, 71);
    ctx.font = "50px Burbank";
    if(shop.data.daily.length < 9 && shop.data.featured.length < 9) {
        // Draw featured
        ctx.fillText(language.get("FORTNITESHOP_FEATURED"), 298, 185);
        // Draw daily
        ctx.fillText(language.get("FORTNITESHOP_DAILY"), 923, 185);
    } else {
        // Draw featured
        ctx.fillText(language.get("FORTNITESHOP_FEATURED"), 447, 185);
        // Draw daily
        ctx.fillText(language.get("FORTNITESHOP_DAILY"), canvas.width - 447, 185);
    }
    // Draw footter
    ctx.fillText(client.config.embed.footer + " - fnbr.co", canvas.width / 2, canvas.height - 18);
    // Extract and Draw date of shop
    ctx.fillText(language.printDate(dateShop), canvas.width / 2, 125);

    if(shop.data.daily.length < 9 && shop.data.featured.length < 9) {
        for(let i = 0; i < shop.data.featured.length; i++) {
            if(i & 1) {
                if(shop.data.featured[i].images.featured) {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                        ctx.drawImage(background, 313, 51 + (149 * i), 268, 268);
                        let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                        ctx.drawImage(item, 313 + 3, 51 + 3 + (149 * i), 262, 262);
                        let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                        ctx.drawImage(itemDesc, 313 + 3, 51 + 192 + (149 * i), 262, 73);
                        ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";
                        ctx.fillText(shop.data.featured[i].name, 313 + 134, 51 + 192 + 32 + (149 * i));
                        let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                        ctx.textAlign = "left";
                        ctx.font = "30px Burbank";
                        if(price >= 1000) {
                            ctx.drawImage(vbuck, 313 + 93, 51 + 192 + 42 + (149 * i), 25, 25);
                            ctx.fillText(shop.data.featured[i].price, 313 + 122, 51 + 192 + 65 + (149 * i));
                        }
                        if(price >= 100 && price < 1000) {
                            ctx.drawImage(vbuck, 313 + 100, 51 + 192 + 42 + (149 * i), 25, 25);
                            ctx.fillText(shop.data.featured[i].price, 313 + 129, 51 + 192 + 65 + (149 * i));
                        }
                        if(price >= 10 && price < 100) {
                            ctx.drawImage(vbuck, 313 + 107, 51 + 192 + 42 + (149 * i), 25, 25);
                            ctx.fillText(shop.data.featured[i].price, 313 + 136, 51 + 192 + 65 + (149 * i));
                        }
                        if(price >= 0 && price < 10) {
                            ctx.drawImage(vbuck, 313 + 114, 51 + 192 + 42 + (149 * i), 25, 25);
                            ctx.fillText(shop.data.featured[i].price, 313 + 143, 51 + 192 + 65 + (149 * i));
                        }
                } else {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                    ctx.drawImage(background, 313, 51 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.featured[i].images.icon);
                    ctx.drawImage(item, 313 + 3, 51 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 313 + 3, 51 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.featured[i].name, 313 + 134, 51 + 192 + 32 + (149 * i));
                    let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 313 + 93, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 313 + 122, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 313 + 100, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 313 + 129, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 313 + 107, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 313 + 136, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 313 + 114, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 313 + 143, 51 + 192 + 65 + (149 * i));
                    }
                }
            } else {
                if(shop.data.featured[i].images.featured) {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                    ctx.drawImage(background, 15, 200 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                    ctx.drawImage(item, 15 + 3, 200 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 15 + 3, 200 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.featured[i].name, 15 + 134, 200 + 192 + 32 + (149 * i));
                    let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 122, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 129, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 136, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 143, 200 + 192 + 65 + (149 * i));
                    }
                } else {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                    ctx.drawImage(background, 15, 200 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.featured[i].images.icon);
                    ctx.drawImage(item, 15 + 3, 200 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 15 + 3, 200 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.featured[i].name, 15 + 134, 200 + 192 + 32 + (149 * i));
                    let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 122, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 129, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 136, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.featured[i].price, 15 + 143, 200 + 192 + 65 + (149 * i));
                    }
                }
            }
        }
        for(let i = 0; i < shop.data.daily.length; i++) {
            if(i & 1) {
                if(shop.data.daily[i].images.daily) {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                    ctx.drawImage(background, 938, 51 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
                    ctx.drawImage(item, 938 + 3, 51 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 938 + 3, 51 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.daily[i].name, 938 + 134, 51 + 192 + 32 + (149 * i));
                    let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 938 + 93, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 122, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 938 + 100, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 129, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 938 + 107, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 136, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 938 + 114, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 143, 51 + 192 + 65 + (149 * i));
                    }
                } else {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                    ctx.drawImage(background, 938, 51 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
                    ctx.drawImage(item, 938 + 3, 51 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 938 + 3, 51 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.daily[i].name, 938 + 134, 51 + 192 + 32 + (149 * i));
                    let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 938 + 93, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 122, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 938 + 100, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 129, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 938 + 107, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 136, 51 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 938 + 114, 51 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 938 + 143, 51 + 192 + 65 + (149 * i));
                    }
                }
            } else {
                if(shop.data.daily[i].images.daily) {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                    ctx.drawImage(background, 640, 200 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
                    ctx.drawImage(item, 640 + 3, 200 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 640 + 3, 200 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.daily[i].name, 640 + 134, 200 + 192 + 32 + (149 * i));
                    let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 640 + 93, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 122, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 640 + 100, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 129, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 640 + 107, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 136, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 640 + 114, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 143, 200 + 192 + 65 + (149 * i));
                    }
                } else {
                    let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                    ctx.drawImage(background, 640, 200 + (149 * i), 268, 268);
                    let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
                    ctx.drawImage(item, 640 + 3, 200 + 3 + (149 * i), 262, 262);
                    let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                    ctx.drawImage(itemDesc, 640 + 3, 200 + 192 + (149 * i), 262, 73);
                    ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(shop.data.daily[i].name, 640 + 134, 200 + 192 + 32 + (149 * i));
                    let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                        vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                    ctx.textAlign = "left";
                    ctx.font = "30px Burbank";
                    if(price >= 1000) {
                        ctx.drawImage(vbuck, 640 + 93, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 122, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 100 && price < 1000) {
                        ctx.drawImage(vbuck, 640 + 100, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 129, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 10 && price < 100) {
                        ctx.drawImage(vbuck, 640 + 107, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 136, 200 + 192 + 65 + (149 * i));
                    }
                    if(price >= 0 && price < 10) {
                        ctx.drawImage(vbuck, 640 + 114, 200 + 192 + 42 + (149 * i), 25, 25);
                        ctx.fillText(shop.data.daily[i].price, 640 + 143, 200 + 192 + 65 + (149 * i));
                    }
                }
            }
        }
    } else {
        let i1Featured = Math.ceil(shop.data.featured.length / 3),
            i2Featured = Math.ceil((shop.data.featured.length - i1Featured) / 2),
            i3Featured = Math.ceil(shop.data.featured.length - (i1Featured + i2Featured)),
            i1Daily = Math.ceil(shop.data.daily.length / 3),
            i2Daily = Math.ceil((shop.data.daily.length - i1Daily) / 2),
            i3Daily = Math.ceil(shop.data.daily.length - (i1Daily + i2Daily));
        for(let i = 0; i < i1Featured; i++) {
            if(shop.data.featured[i].images.featured) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 15, 200 + (298 * i), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                ctx.drawImage(item, 15 + 3, 200 + 3 + (298 * i), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 15 + 3, 200 + 192 + (298 * i), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 15 + 134, 200 + 192 + 32 + (298 * i));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 122, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 129, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 136, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 143, 200 + 192 + 65 + (298 * i));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 15, 200 + (298 * i), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.icon);
                ctx.drawImage(item, 15 + 3, 200 + 3 + (298 * i), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 15 + 3, 200 + 192 + (298 * i), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 15 + 134, 200 + 192 + 32 + (298 * i));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 122, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 129, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 136, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 15 + 143, 200 + 192 + 65 + (298 * i));
                }
            }
        }
        for(let i = i1Featured; i < i1Featured + i2Featured; i++) {
            if(shop.data.featured[i].images.featured) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 313, 200 + (298 * (i - i1Featured)), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                ctx.drawImage(item, 313 + 3, 200 + 3 + (298 * (i - i1Featured)), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 313 + 3, 200 + 192 + (298 * (i - i1Featured)), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 313 + 134, 200 + 192 + 32 + (298 * (i - i1Featured)));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 313 + 93, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 122, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 313 + 100, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 129, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 313 + 107, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 136, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 313 + 114, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 143, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 313, 200 + (298 * (i - i1Featured)), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.icon);
                ctx.drawImage(item, 313 + 3, 200 + 3 + (298 * (i - i1Featured)), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 313 + 3, 200 + 192 + (298 * (i - i1Featured)), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 313 + 134, 200 + 192 + 32 + (298 * (i - i1Featured)));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 313 + 93, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 122, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 313 + 100, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 129, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 313 + 107, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 136, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 313 + 114, 200 + 192 + 42 + (298 * (i - i1Featured)), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 313 + 143, 200 + 192 + 65 + (298 * (i - i1Featured)));
                }
            }
        }
        for(let i = i1Featured + i2Featured; i < i1Featured + i2Featured + i3Featured; i++) {
            if(shop.data.featured[i].images.featured) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 611, 200 + (298 * (i - (i1Featured + i2Featured))), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                ctx.drawImage(item, 611 + 3, 200 + 3 + (298 * (i - (i1Featured + i2Featured))), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 611 + 3, 200 + 192 + (298 * (i - (i1Featured + i2Featured))), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 611 + 134, 200 + 192 + 32 + (298 * (i - (i1Featured + i2Featured))));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 611 + 93, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 122, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 611 + 100, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 129, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 611 + 107, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 136, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 611 + 114, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 143, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.featured[i].rarity}.png`);
                ctx.drawImage(background, 611, 200 + (298 * (i - (i1Featured + i2Featured))), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.icon);
                ctx.drawImage(item, 611 + 3, 200 + 3 + (298 * (i - (i1Featured + i2Featured))), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 611 + 3, 200 + 192 + (298 * (i - (i1Featured + i2Featured))), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.featured[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.featured[i].name, 611 + 134, 200 + 192 + 32 + (298 * (i - (i1Featured + i2Featured))));
                let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.featured[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 611 + 93, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 122, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 611 + 100, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 129, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 611 + 107, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 136, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 611 + 114, 200 + 192 + 42 + (298 * (i - (i1Featured + i2Featured))), 25, 25);
                    ctx.fillText(shop.data.featured[i].price, 611 + 143, 200 + 192 + 65 + (298 * (i - (i1Featured + i2Featured))));
                }
            }
        }
        for(let i = 0; i < i1Daily; i++) {
            if(shop.data.daily[i].images.daily) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 939, 200 + (298 * i), 268, 268);
                let item = await Canvas.loadImage(shop.data.featured[i].images.featured);
                ctx.drawImage(item, 939 + 3, 200 + 3 + (298 * i), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 939 + 3, 200 + 192 + (298 * i), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 939 + 134, 200 + 192 + 32 + (298 * i));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 939 + 93, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 122, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 939 + 100, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 129, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 939 + 107, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 136, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 939 + 114, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 143, 200 + 192 + 65 + (298 * i));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 939, 200 + (298 * i), 268, 268);
                let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
                ctx.drawImage(item, 939 + 3, 200 + 3 + (298 * i), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 939 + 3, 200 + 192 + (298 * i), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 939 + 134, 200 + 192 + 32 + (298 * i));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 939 + 93, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 122, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 939 + 100, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 129, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 939 + 107, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 136, 200 + 192 + 65 + (298 * i));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 939 + 114, 200 + 192 + 42 + (298 * i), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 939 + 143, 200 + 192 + 65 + (298 * i));
                }
            }
        }
        for(let i = i1Daily; i < i1Daily + i2Daily; i++) {
            if(shop.data.daily[i].images.daily) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 1237, 200 + (298 * (i - i1Daily)), 268, 268);
                let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
                ctx.drawImage(item, 1237 + 3, 200 + 3 + (298 * (i - i1Daily)), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 1237 + 3, 200 + 192 + (298 * (i - i1Daily)), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 1237 + 134, 200 + 192 + 32 + (298 * (i - i1Daily)));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 1237 + 93, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 122, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 1237 + 100, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 129, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 1237 + 107, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 136, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 1237 + 114, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 143, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 1237, 200 + (298 * (i - i1Daily)), 268, 268);
                let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
                ctx.drawImage(item, 1237 + 3, 200 + 3 + (298 * (i - i1Daily)), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 1237 + 3, 200 + 192 + (298 * (i - i1Daily)), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 1237 + 134, 200 + 192 + 32 + (298 * (i - i1Daily)));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 1237 + 93, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 122, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 1237 + 100, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 129, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 1237 + 107, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 136, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 1237 + 114, 200 + 192 + 42 + (298 * (i - i1Daily)), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1237 + 143, 200 + 192 + 65 + (298 * (i - i1Daily)));
                }
            }
        }
        for(let i = i1Daily + i2Daily; i < i1Daily + i2Daily + i3Daily; i++) {
            if(shop.data.daily[i].images.daily) {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 1535, 200 + (298 * (i - (i1Daily + i2Daily))), 268, 268);
                let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
                ctx.drawImage(item, 1535 + 3, 200 + 3 + (298 * (i - (i1Daily + i2Daily))), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 1535 + 3, 200 + 192 + (298 * (i - (i1Daily + i2Daily))), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 1535 + 134, 200 + 192 + 32 + (298 * (i - (i1Daily + i2Daily))));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 1535 + 93, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 122, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 1535 + 100, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 129, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 1535 + 107, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 136, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 1535 + 114, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 143, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
            } else {
                let background = await Canvas.loadImage(`./assets/img/fortnite/shop/card_${shop.data.daily[i].rarity}.png`);
                ctx.drawImage(background, 1535, 200 + (298 * (i - (i1Daily + i2Daily))), 268, 268);
                let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
                ctx.drawImage(item, 1535 + 3, 200 + 3 + (298 * (i - (i1Daily + i2Daily))), 262, 262);
                let itemDesc = await Canvas.loadImage("./assets/img/fortnite/shop/card_itemdesc.png");
                ctx.drawImage(itemDesc, 1535 + 3, 200 + 192 + (298 * (i - (i1Daily + i2Daily))), 262, 73);
                ctx.font = applyItemName(canvas, shop.data.daily[i].name);
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(shop.data.daily[i].name, 1535 + 134, 200 + 192 + 32 + (298 * (i - (i1Daily + i2Daily))));
                let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                    vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
                ctx.textAlign = "left";
                ctx.font = "30px Burbank";
                if(price >= 1000) {
                    ctx.drawImage(vbuck, 1535 + 93, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 122, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 100 && price < 1000) {
                    ctx.drawImage(vbuck, 1535 + 100, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 129, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 10 && price < 100) {
                    ctx.drawImage(vbuck, 1535 + 107, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 136, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
                if(price >= 0 && price < 10) {
                    ctx.drawImage(vbuck, 1535 + 114, 200 + 192 + 42 + (298 * (i - (i1Daily + i2Daily))), 25, 25);
                    ctx.fillText(shop.data.daily[i].price, 1535 + 143, 200 + 192 + 65 + (298 * (i - (i1Daily + i2Daily))));
                }
            }
        }
    }
    fs.writeFileSync(`./assets/img/fortnite/shop/${language.getLang()}/${imageName}.png`, canvas.toBuffer());
    return `./assets/img/fortnite/shop/${language.getLang()}/${getFileName()}.png`;
}

async function init(client) {

    // Every day at 2.05pm
    new CronJob("0 5 2 * * *", function() {
        deleteOldFiles();
    }, null, true, "Europe/Paris");
    
    new CronJob("30 1 2 * * *", async function() {
        if(!client.config.apiKeys.fortniteFNBR || client.config.apiKeys.fortniteFNBR === "") return;
        checkImage(client);
        client.guilds.forEach(async (guild) => {
            let guildData = await client.functions.getGuildData(guild.client, guild);
            let language = new(require("../languages/"+guildData.language+".js"));
            let path = `./assets/img/fortnite/shop/${language.getLang()}/${getFileName()}.png`;
            if(guildData.plugins.fortniteshop && fs.existsSync(path)) {
                let fnChannel = client.channels.get(guildData.plugins.fortniteshop);
                if(fnChannel) {
                    let attachment = new Discord.MessageAttachment(path, `${fileName}.png`),
                    embed = new Discord.MessageEmbed()
                    .setAuthor(language.get("FORTNITESHOP_TITLE", language.printDate(dateShop)), client.user.displayAvatarURL())
                    .attachFiles(attachment)
                    .setImage(`attachment://${fileName}.png`)
                    .setColor(client.config.embed.color)
                    .setFooter(client.config.embed.footer);
                    let msg = await fnChannel.send(embed);
                    await msg.react("😍");
                    await msg.react("😐");
                    await msg.react("😭");
                }
            }
        });
    }, null, true, "Europe/Paris");
}

module.exports = {
    init,
    checkImage,
    getFileName
};
