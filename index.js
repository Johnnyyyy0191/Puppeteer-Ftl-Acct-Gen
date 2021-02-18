const puppeteer = require('puppeteer')
const fs = require('fs')
const fetch = require('node-fetch')
const url = 'https://www.footlocker.com/account/create'
const webhookUrl = '' //input your discord webhook here
const zip = '' //enter your zip code

const emailstxt = fs.readFileSync("./emails.txt", "utf-8");
const emails = emailstxt.split("\n")
console.log(emails)

const firstnamestxt = fs.readFileSync("./firstnames.txt", "utf-8");
const firstNames = firstnamestxt.split("\n")
console.log(firstNames)

const lastnamestxt = fs.readFileSync("./lastnames.txt", "utf-8");
const lastNames = lastnamestxt.split("\n")
console.log(lastNames)

const phonenumberstxt = fs.readFileSync("./phonenumbers.txt", "utf-8");
const phoneNumbers = phonenumberstxt.split("\n")
console.log(phoneNumbers)

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const monthInput = months[Math.floor(Math.random() * Math.floor(months.length))]
console.log(monthInput)
let days = []
for (i = 1; i < 29; i++) {
    if (i < 10) {
        days.push(`0${i}`)
    } else
    days.push(`${i}`)
}
const dayInput = days[Math.floor(Math.random() * Math.floor(days.length))]
console.log(dayInput)
const years = []
for (i = 1970; i < 2001; i++) {
    years.push(`${i}`)
}
const yearInput = years[Math.floor(Math.random() * Math.floor(years.length))]
console.log(yearInput)

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const number = "1234567890"
const special = "$#@!%&"

async function start () {
    for (i = 0; i < emails.length; i++) {

        let u1 = Math.floor(Math.random() * Math.floor(upperCase.length))
        let u2 = Math.floor(Math.random() * Math.floor(upperCase.length))
        let u3 = Math.floor(Math.random() * Math.floor(upperCase.length))
        let l1 = Math.floor(Math.random() * Math.floor(lowerCase.length))
        let l2 = Math.floor(Math.random() * Math.floor(lowerCase.length))
        let l3 = Math.floor(Math.random() * Math.floor(lowerCase.length))
        let n = Math.floor(Math.random() * Math.floor(number.length))
        let s = Math.floor(Math.random() * Math.floor(special.length))

        let email = emails[i]
        let firstName = firstNames[i]
        let lastName = lastNames[i]
        let phoneNumber = phoneNumbers[i]
        let password = upperCase.charAt(u1) + upperCase.charAt(u2) + upperCase.charAt(u3) + lowerCase.charAt(l1) + lowerCase.charAt(l2) + lowerCase.charAt(l3) + number.charAt(n) + special.charAt(s)
        console.log(password)
    
        //let proxyIp = ''
        //let proxyPort = ''
        //let proxyUser = ''
        //let proxyPass = ''
        await main(email, firstName, lastName, phoneNumber, password)
    }
}

const main = async (email, fname, lname, phoneNumber, password) => {
    const browser = await puppeteer.launch({
        headless: false,
        //args: [`--proxy-server = ${proxyIp}:${proxyPort}`]
    })
    const page = await browser.newPage()
    //await page.authenticate({username: proxyUser, password: proxyPass})
    await page.goto(url, { waitUntil: 'networkidle2' })
    await page.waitForSelector('input[id="AccountCreate_text_firstName"]')
    await page.type('input[id="AccountCreate_text_firstName"]', fname)
    await page.type('input[id="AccountCreate_text_lastName"]', lname)
    await page.type('input[id="AccountCreate_tel_dateofbirthmonth"]', monthInput)
    await page.type('input[id="AccountCreate_tel_dateofbirthday"]', dayInput)
    await page.type('input[id="AccountCreate_tel_dateofbirthyear"]', yearInput)
    await page.type('input[id="AccountCreate_text_postalCode"]', zip)
    await page.type('input[id="AccountCreate_email_uid"]', email)
    await page.type('input[id="AccountCreate_password_password"]', password)
    await page.type('input[id="AccountCreate_tel_phoneNumber"]', phoneNumber)
    await page.waitForTimeout(500)
    await Promise.all([
        page.click('button[class="Button"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    if (await page.url() == 'https://www.footlocker.com/account/create/almost-done') {
        fetch(webhookUrl, {
            "method":"POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({ 
             "content": "Account Successfully Created :white_check_mark: ", 
             "embeds": [
               {
                 "title": "Jhny AIO",
                 "color": 3066993,
                 "fields": [
                   {
                   "name": "Module",
                   "value": "Footlocker Account Gen"
                   },
                   {
                     "name": "Email",
                     "value": `||${email}||`
                   },
                   {
                     "name": "Password",
                     "value": `||${password}||`
                   }
    
                 ]
    
               }
             ]
             })
       
           })
           .then(res=> console.log(res))
           .catch(err => console.error(err));
        console.log('success')
        await browser.close()
    } else if (await page.url() == 'https://www.footlocker.com/account/create') {
        await page.waitForTimeout(500)
        await page.type('input[id="AccountCreate_text_firstName"]', fname)
    await page.type('input[id="AccountCreate_text_lastName"]', lname)
    await page.type('input[id="AccountCreate_tel_dateofbirthmonth"]', monthInput)
    await page.type('input[id="AccountCreate_tel_dateofbirthday"]', dayInput)
    await page.type('input[id="AccountCreate_tel_dateofbirthyear"]', yearInput)
    await page.type('input[id="AccountCreate_text_postalCode"]', zip)
    await page.type('input[id="AccountCreate_email_uid"]', email)
    await page.type('input[id="AccountCreate_password_password"]', password)
    await page.type('input[id="AccountCreate_tel_phoneNumber"]', phoneNumber)
    await page.waitForTimeout(500)
    await Promise.all([
        page.click('button[class="Button"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]) 
    if (await page.url() == 'https://www.footlocker.com/account/create/almost-done') {
        console.log('success')
        fetch(webhookUrl, {
            "method":"POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({ 
             "content": "Account Successfully Created :white_check_mark: ", 
             "embeds": [
               {
                 "title": "Jhny AIO",
                 "color": 3066993,
                 "fields": [
                   {
                   "name": "Module",
                   "value": "Footlocker Account Gen"
                   },
                   {
                     "name": "Email",
                     "value": `||${email}||`
                   },
                   {
                     "name": "Password",
                     "value": `||${password}||`
                   }
    
                 ]
    
               }
             ]
             })
       
           })
           .then(res=> console.log(res))
           .catch(err => console.error(err));
        await browser.close
    };
    } else {
        console.log('fail')
        await browser.close()
    }    
}
