const puppeteer = require('puppeteer');
const axe=require('axe-core');
var page;
async function gmail(){
	const browser = await puppeteer.launch({headless: false,devtools:true});
	page = await browser.newPage();
	await page.setViewport({width:1400,height:700});	
	function openDashboard(){
		return page.goto('http://gmail.com');
	}
	async function doLogin(){
		await page.waitFor(5000);
		await page.type('#identifierId', '<username>', {delay: 100});
		await page.click('#identifierNext');
		await page.waitFor(5000);
		await page.type('[name=password]', '<password>', {delay: 100});
		await page.click('#passwordNext');		
	}
	async function checkAccessibility(){
		await page.addScriptTag({path: require.resolve('axe-core')});
		await page.addScriptTag({path: require.resolve('jquery')});
		var accessibility_issues=await page.evaluate(() => {
			try{
				console.log("rules applied by axe-core",axe.getRules());
				//Below commented code is to disable any(meta-viewport) accessiblity rule.
				//axe.configure({
				//	checks: [{"id":"meta-viewport","enabled":false}]
				//});
				var accessibilityPromise=new Promise(function(resolve,reject){
					axe.a11yCheck(document, function (results) {
						console.log("accessibility-log",results);
						resolve(results);
					});
				});
				accessibilityPromise.then(function(data){
					return Promise.resolve(data);
				});
				return accessibilityPromise;				
			}catch(e){
				console.log("e",e);
			}
		});
		console.log('===');
		console.log("Page Audit is as follows",accessibility_issues);
	}
	async function getDashboardPrint(){
		await page.waitFor(8000);
		page.screenshot({path: 'dashboard.png'});
		checkAccessibility();		
	}
	var dashboardUrl=openDashboard();
	
	dashboardUrl.then(function(s){
		console.log('Open Login Page');
		var loginSuccess=doLogin();
		loginSuccess.then(function(){
			console.log("Login Success");
			getDashboardPrint();
		},function(){
			console.log("Login Failed");
		});
	},function(f){
		console.log('Something went wrong. Please check your Internet Connection');		
	});	
	
}

gmail();