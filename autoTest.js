var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
var nodemailer = require('nodemailer');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var timeout = function(ms){
    return new Promise(function(res){return setTimeout(res, ms)});
}

async function main(){
    var errorList = [];
    var loadTime = 20000;
    var testStarted = getDate();
    var driver = new webdriver.Builder().forBrowser('chrome').build();

    // 로그인
    await driver.get('https://192.168.0.130:8443');
    await driver.findElement(webdriver.By.name('email')).sendKeys('admin');
    await driver.findElement(webdriver.By.name('password')).sendKeys('zester1309');
    await driver.findElement(webdriver.By.tagName('form')).submit();


    // 메뉴 테스트
    await checkMenu('list_0_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'BFLAB/RC - TEST');
    await checkMenu('list_0_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'BFLAB/RC - MODEL');
    await checkMenu('list_0_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'BFLAB/RC - DAILY');
    await checkMenu('list_1_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'PROFILE - DAILY');
    await checkMenu('list_1_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'PROFILE - TEST');
    await checkMenu('list_1_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'PROFILE - MODEL');
    await checkMenu('list_1_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'BASIC TEST - MODEL');
    await checkMenu('list_1_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'BASIC TEST - TEST');
    await checkMenu('list_1_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'BASIC TEST - DAILY');
    await checkMenu('list_1_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'COEX - DAILY');
    await checkMenu('list_1_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'COEX - TEST');
    await checkMenu('list_1_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'COEX - MODEL');
    await checkMenu('list_1_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'BFLAB - MODEL');
    await checkMenu('list_1_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'BFLAB - TEST');
    await checkMenu('list_1_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'BFLAB - DAILY');
    await checkMenu('list_1_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[4]', 'BFLAB - sREPORT');

    await checkMenu('list_2_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'APIOT - sREPORT');
    await checkMenu('list_2_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'APIOT - TEST');
    await checkMenu('list_2_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'Advanced Roaming - TEST');
    await checkMenu('list_2_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'Advanced Roaming - sREPORT');
    await checkMenu('list_2_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'STA/P2P Concurrent Tput - TEST');
    await checkMenu('list_2_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', '11ac vs 11ax - TEST');
    await checkMenu('list_2_4', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'Exec. Time - TEST');
    await checkMenu('list_2_4', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'Exec. Time - MODEL');
    await checkMenu('list_2_4', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'Exec. Time - DAILY');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'RvA - DAILY');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'RvA - TEST');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'RvA - sREPORT');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[4]', 'RvA - BENCHMARK');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[5]', 'RvA - RANK');
    await checkMenu('list_2_6', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'Regulatory - TEST');
    await checkMenu('list_2_6', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'Regulatory - DAILY');
    await checkMenu('list_2_6', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'Regulatory - sREPORT');
    await checkMenu('list_2_7', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'SELF VT - TEST');
    await checkMenu('list_2_7', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'SELF VT - MODEL');
    await checkMenu('list_2_7', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[3]', 'SELF VT - DAILY');
    await checkMenu('list_2_8', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[1]', 'Regression - TEST');
    await checkMenu('list_2_8', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/control-result-fixed/div/div/div/ul/li[1]/div[2]/ul/li[2]', 'Regression - MODEL');

    await checkMenu('list_3_0', null, 'Launch Information');
    await checkMenu('list_3_1', null, 'DUT_MGT');
    await checkMenu('list_3_2', null, 'ZESTER_MGT');
    await checkMenu('list_3_3', null, 'DUT SUPPLEMENTARY');
    await checkMenu('list_3_4', null, 'N/A TC List');
    await checkMenu('list_3_5', null, 'APIOT Pass Criteria');
    await checkMenu('list_3_6', null, 'Report Import');
    await checkMenu('list_3_7', null, 'AP Info');

    // TEST CASE
    await checkMenu('list_0_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'BFLAB/RC - TEST');
    await checkMenu('list_0_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'BFLAB/RC - TESTCASE');
    await checkMenu('list_1_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'PROFILE - TESTCASE');
    await checkMenu('list_1_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'BASIC TEST - TESTCASE');
    await checkMenu('list_1_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'COEX - TESTCASE');
    await checkMenu('list_1_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'BFLAB - TESTCASE');
    await checkMenu('list_2_0', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'APIOT - TESTCASE');
    await checkMenu('list_2_1', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'Advanced Roaming - TESTCASE');
    await checkMenu('list_2_2', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'STA/P2P Concurrent Tput - TESTCASE');
    await checkMenu('list_2_3', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', '11ac vs 11ax - TESTCASE');
    await checkMenu('list_2_4', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'Exec. Time - TESTCASE');
    await checkMenu('list_2_5', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'RvA - TESTCASE');
    await checkMenu('list_2_6', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'Regulatory - TESTCASE');
    await checkMenu('list_2_7', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'SELF VT - TESTCASE');
    await checkMenu('list_2_8', '/html/body/div[1]/div/app-root/div/div/app-contorller/div/div/div/div/ul/li[1]/a', 'Regression - TESTCASE');


    timeout(1000);
    mail(errorList);
    driver.quit();

    // 작업 함수
    async function checkMenu(list, tab, name){
        await timeout(500);
        var startTime = new Date().getTime();
        try{
            await driver.wait(webdriver.until.elementLocated(webdriver.By.id(list))).click();
            await driver.wait(checkBackDrop, loadTime);
            await timeout(500);
            if(tab){
                driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(tab))).click();
            }
            var url = await driver.getCurrentUrl();
            var r = {
                type: 'Success',
                latency: new Date().getTime() - startTime - 500,
                url: url,
                name: name,
                message: 'Success'
            }
            errorList.push(r);
            await driver.wait(checkBackDrop, loadTime);
            await timeout(500);

            return true;
        }catch(e){
            var url = await driver.getCurrentUrl();
            var r = {
                type: (e.name === 'T' ? 'TimeoutError' : (e.name === 'n' ? 'WebDriverError' : '')),
                latency: (new Date().getTime() - startTime) + (e.name === 'TimeoutError' || e.name === 'T'? '+' : ''),
                url: url,
                name: name,
                message:  e.message
            }
            console.log(r);
            errorList.push(r);
            // 로딩화면 제거
            try{
                await driver.executeScript("return $('#theModal').modal('hide');");
            }catch (e){

            }
            await timeout(1000);
            return true;
        }
    }

    async function checkBackDrop() {
        var promise = await driver.findElement(webdriver.By.id('theModal')).getAttribute('style');
        if(promise){
            var value;
            var array = promise.split(';');
            array.forEach(function(d){
                var obj = d.split(':');
                if(obj[0] === 'display'){
                    value = obj[1].replace(' ', '');
                };
            });
            try{
                var a = await driver.findElements(webdriver.By.className('modal-backdrop'));
            }catch(e){
            }

            if(value && value === 'none' && !a.length){
                return true
            }else{
                return false;
            }
        };

        return false;
    }

    function mail(errorLsit){
        var transporter = nodemailer.createTransport('smtps://zvtest0009%40gmail.com:zester1309@smtp.gmail.com');
        var message = 'Test Date: '+ testStarted + ' ~ ' + getDate() + '<br>' +
            '<table>' +
            '<tr style="text-align: center;"><td>Name</td><td>URL</td><td>Result</td><td>Latency (msec)</td></tr>';
        errorLsit.forEach(function(d){
            if(d.type === 'TimeoutError'){
                message += '<tr style="background: red">';
            }else if(d.type === 'WebDriverError'){
                message += '<tr style="background: yellow;">';
            }else{
                message += '<tr>';
            }
           message += '<td>'+d.name+'</td><td>'+d.url+'</td><td>'+d.type+'</td><td style="text-align: right;">'+d.latency+'</td></tr>';
        });
        message += '</table>';

        console.log(message);
        /*if(errorLsit.length){
            errorLsit.forEach(function(d){
                message += d + '<br>';
            });
        }else{
            message += 'Errror가 없습니다.';
        }*/

        var mailOptions = {
            from: 'ZESTER <zester@zvolti.com>', // sender address
            to: 'djoh@zvolti.com', // list of receivers
            cc: 'hyyoon@zvolti.com',
            subject: 'ZESTER WEB 자동 로딩 테스트 결과.', // Subject line
            html: message
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error) console.log(error);
            else console.log('Error Mail - Send');
        });
    }

    function getDate() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

        return year + '-' + month + '-' + day + ' ' + hour + ":" + min;
    }

}

main();
var interval = setInterval(function(){
    main();
}, 3600000);


