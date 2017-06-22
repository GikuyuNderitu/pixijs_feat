const chai = require('chai');
const expect = chai.expect;

const webdriver = require("selenium-webdriver");
const by = webdriver.By;
const chrome = require("selenium-webdriver/chrome");

before(function() {
	const path = require("chromedriver").path;
	const service = new chrome.ServiceBuilder(path).build();
	chrome.setDefaultService(service);
	const builder = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome());
	// `this.driver` will be how we communicate with the browser
	this.driver = builder.build();
})

after(function(done) {
	this.driver.quit().then(done);
})

describe("PixiJS Website", function () {
    it("has the correct header", function (done) {  // NOTICE !! PASSING `done` AS PARAMETER
        // By default mocha will only wait 2 seconds, but it may take longer for chrome to open 
        // So we will set it to 10 seconds (if you have a slow computer, you may need to set it longer)
        this.timeout(100000);
	   const d = this.driver;
        
	   d.get("http://www.pixijs.com/").then(function() {
		d.findElement(by.css("header#homepage-header h1")).getText().then(function(header) {
			expect(header).to.equal("The HTML5 Creation Engine");
			done();
		})
	   });
    });

    it("has a download link", function(done) {
	    this.timeout(10000);
	    const d = this.driver;

	    d.get("http://www.pixijs.com/").then(function() {
		    d.findElement(by.css("a[href='https://github.com/GoodBoyDigital/pixi.js'] span")).getText().then(function(linkText) {
			    expect(linkText).to.equal("DOWNLOAD");
			    done();
		    })
	    })
    })

    it("has a get started link", function(done) {
	    this.timeout(10000);
	    const d = this.driver;

	    d.get("http://www.pixijs.com/").then(function() {
		    d.findElement(by.css("a[href='tutorials'] span")).getText().then(function(linkText) {
			    expect(linkText).to.equal("GET STARTED");
			    done();
		    })
	    })
    })

    it("has a the button to star the repo on github", function(done) {
	    this.timeout(10000);
	    const d = this.driver;

	    d.get("http://www.pixijs.com/").then(function() {
		    d.findElement(by.css("iframe.counter")).getAttribute("src").then(function(linkText) {
			    expect(linkText).to.equal("https://ghbtns.com/github-btn.html?user=pixijs&repo=pixi.js&type=star&count=true");
			    done();
		    })
	    })
    })

    it("has a pixijs logo", function(done) {
		this.timeout(10000);
		const d = this.driver;

		d.get("http://www.pixijs.com/").then(function() {
			d.findElement(by.css("img.pixijs-logo")).getAttribute("alt").then(function(linkText) {
				expect(linkText).to.equal("PixiJS v4 Logo");
				done();
			})
		})  
    })

    it("has a goodboy logo", function(done) {
		this.timeout(10000);
		const d = this.driver;

		d.get("http://www.pixijs.com/").then(function() {
			d.findElement(by.css("img.goodboy")).getAttribute("alt").then(function(linkText) {
				expect(linkText).to.equal("goodboy logo");
				done();
			})
		})  
    })
});