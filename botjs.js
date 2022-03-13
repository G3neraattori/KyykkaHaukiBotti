const puppeteer = require('puppeteer');
const url = 'https://kyykka.com/joukkueet';
/*const fs = require("fs/promises")
const $ = require('cheerio');
const {find} = require("cheerio/lib/api/traversing");*/

module.exports = {
    getHauki: async (nimi, joukkue) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const teamURL = await module.exports.getTeamUrl(joukkue);
        await page.goto(teamURL, {waitUntil: "networkidle2"});

        const result = await page.$$eval('#app > div > main > div > div > div.flex.auto > div > div.v-data-table.mt-5.theme--light > div > table > tbody > tr', (msgs) => msgs.map((msg) => {
                return {
                    name: msg.querySelector(' div > table > tbody > tr > td:nth-child(2)').innerText,
                    hauet: msg.querySelector(' div > table > tbody > tr > td:nth-child(9)').innerText
                }
            })
        );
        //console.log(result)
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            if (element.name.includes(nimi)) {
                console.log("Player Found!");
                await browser.close();
                return element.hauet;
            }

        }
        await browser.close();
        console.log("Player Found!");
        return false;

    },

    getTeamUrl: async(team) =>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: "networkidle2"});
        const [linkHandler] = await page.$x(`/html/body/div/div/main/div/div/div/div/div[2]/div/table/tbody/tr/td[2][contains(., '${team}')]`);
        if(linkHandler){
            console.log("URL found")
            await linkHandler.click();
            await page.waitForNavigation();
        }
        await browser.close();
        let teamURL = page.url();


        return teamURL;
    }
};

