const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill('admin')
  await page.getByTestId('password').fill('123')
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('write blog title here').fill('a blog created by playwright')
  await page.getByRole('button', { name: 'save' }).click()
}

export { loginWith, createBlog }