import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 390, height: 500 },
  contextOptions: { reducedMotion: 'no-preference' },
})

test('timeline entries reveal on scroll and stay visible', async ({ page }) => {
  await page.goto('/updates')
  const entries = page.locator('.timeline-entry')
  await expect(entries).toHaveCount(3)
  await expect(entries.first()).toHaveCSS('opacity', '1')
  await expect(entries.last()).toHaveClass(/reveal-pending/)
  await expect(entries.last()).toHaveCSS('opacity', '0')
  await entries.last().scrollIntoViewIfNeeded()
  await expect(entries.last()).not.toHaveClass(/reveal-pending/)
  await expect(entries.last()).toHaveCSS('opacity', '1')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(entries.last()).not.toBeInViewport()
  await expect(entries.last()).not.toHaveClass(/reveal-pending/)
  await expect(entries.last()).toHaveCSS('opacity', '1')
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    )
    .toBe(false)
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await page.getByRole('link', { name: 'Updates', exact: true }).click()
  await expect(entries.first()).toHaveCSS('opacity', '1')
})

test('reduced motion keeps all entries visible without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/updates')
  await expect(page.locator('.timeline-entry')).toHaveCount(3)
  await expect(page.locator('.reveal-pending')).toHaveCount(0)
  await expect(page.locator('.timeline-entry').last()).toHaveCSS('opacity', '1')
  await expect(page.locator('.timeline-entry').last()).toHaveCSS('transform', 'none')
  // Global reduced-motion CSS uses 0.01ms, serialized differently across engines.
  await expect
    .poll(() =>
      page
        .locator('.timeline-entry')
        .last()
        .evaluate((entry) =>
          Math.max(...getComputedStyle(entry).transitionDuration.split(',').map(Number.parseFloat)),
        ),
    )
    .toBeLessThanOrEqual(0.00001)
})

test('entries remain visible when IntersectionObserver is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, 'IntersectionObserver')
  })
  await page.goto('/updates')
  await expect(page.locator('.timeline-entry')).toHaveCount(3)
  await expect(page.locator('.reveal-pending')).toHaveCount(0)
  await expect(page.locator('.timeline-entry').last()).toHaveCSS('opacity', '1')
})

test('changing to reduced motion reveals pending entries', async ({ page }) => {
  await page.goto('/updates')
  const last = page.locator('.timeline-entry').last()
  await expect(last).toHaveClass(/reveal-pending/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(last).toHaveCSS('opacity', '1')
  await expect(last).toHaveCSS('transform', 'none')
})
