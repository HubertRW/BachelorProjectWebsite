import { test, expect } from '@playwright/test'

test('home page presents the group and USN logo placeholder', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering ideas')
  await expect(page.getByText('IMAGE HERE').first()).toBeVisible()
  await expect(page.getByText('USN LOGO')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Meet the team' })).toBeVisible()
})

test('about page contains six student profile slots', async ({ page }) => {
  await page.goto('/about')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Meet the')
  await expect(page.locator('.student-card')).toHaveCount(6)
  await expect(page.getByText('PORTRAIT 01')).toBeVisible()
  await expect(page.getByText('PORTRAIT 06')).toBeVisible()
})

test('navigation works and mobile layout has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('link', { name: 'About us' }).click()

  await expect(page).toHaveURL(/\/about$/)
  await expect(page.locator('.student-card')).toHaveCount(6)

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
})
