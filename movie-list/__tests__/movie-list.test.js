const {Builder,Capabilities, By} = require('selenium-webdriver')
const { verifyMovie } = require('../functions/verifyMovie')
require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async() => {
    await driver.get('http://127.0.0.1:5501/movie-list/index.html')
})

afterAll(async() => {
    await driver.quit()
})

describe('tests for movie-list page', () => {

    test('submit adds a new movie',async() => {
        //first we need the input field
        await driver.findElement(By.xpath('//input')).sendKeys('Back to the future \n')
        //we need the button
        // await driver.findElement(By.xpath(`//button`)).click()
        //use Xpath to get the li element which was newly created
        const movie = await driver.findElement(By.xpath(`//li`))
        //use the isDisplayed method which evaluates to true or false
        const displayed =  await movie.isDisplayed()
        //expect result of isdisplayed to be true
        expect(displayed).toBeTruthy()
        
    })

    test('displayed movie matches entered movie', async() => {
        await verifyMovie(driver)
        await driver.sleep(5000)
    })
})