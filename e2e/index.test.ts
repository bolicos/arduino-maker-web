const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

const URL_BASE = "https://arduino-web.netlify.app/";

describe("tela", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("tela", async () => {
    await driver.get(URL_BASE);
    await driver.manage().window().setRect({ width: 715, height: 733 });
    await driver.findElement(By.css(".col-md-4:nth-child(1) .btn")).click();

    {
      const dropdown = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(2)"));
      await dropdown.findElement(By.xpath("//option[. = 'Servo']")).click();
    }

    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).release().perform();
    }
    {
      const dropdown = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(2)"));
      await dropdown.findElement(By.xpath("//option[. = 'Led']")).click();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(2)"));
      await driver.actions({ bridge: true }).click(element).release().perform();
    }
    {
      const dropdown = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(5)"));
      await dropdown.findElement(By.xpath("//option[. = 'A1']")).click();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(1) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).release().perform();
    }
    {
      const dropdown = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(5)"));
      await dropdown.findElement(By.xpath("//option[. = 'D1']")).click();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css(".col:nth-child(2) > .form-select:nth-child(5)"));
      await driver.actions({ bridge: true }).click(element).release().perform();
    }
    await driver.findElement(By.css(".btn-success")).click();
    {
      const element = await driver.findElement(By.css(".btn-success"));
      await driver.actions({ bridge: true }).click(element).perform();
    }
    {
      const element = await driver.findElement(By.css("body"));
      await driver.actions({ bridge: true }).click(element, 0, 0).perform();
    }
    {
      const elements = await driver.findElements(By.css(".card-body"));
      assert(elements.length);
    }
  });
});
