import puppeteer from 'puppeteer'

describe('Login', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto('http://localhost:8000/en/login', {
      waitUntil: 'networkidle2',
    })
  })

  afterEach(() => page.close())

  it('should login with failure', async () => {
    await page.waitFor(selector => !!document.querySelector('#username'), {
      timeout: 3000,
    })
    await page.type('#username', 'wrong_user')
    await page.type('#password', 'wrong_password')
    await page.click('button[type="button"]')
    await page.waitForSelector('.anticon-close-circle') // should display error
  })

  it('should login successfully', async () => {
    await page.waitForSelector('#username', { timeout: 3000 })
    await page.type('#username', 'admin')
    await page.type('#password', 'admin')
    await page.click('button[type="button"]')
    await page.waitForSelector('.ant-layout-footer')
    const text = await page.evaluate(() => document.body.innerHTML)
    expect(text).toContain('Ant Design Admin')
  })

  afterAll(() => browser.close())
})
