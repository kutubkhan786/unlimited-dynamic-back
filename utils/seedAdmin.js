import User from '../models/User.js'

export async function seedAdmin() {
  const existingAdmin = await User.findOne({ role: 'admin' })
  if (existingAdmin) {
    return
  }

  const username = process.env.SUPERADMIN_USERNAME || 'superadmin'
  const password = process.env.SUPERADMIN_PASSWORD || 'Admin@123'
  const email = process.env.SUPERADMIN_EMAIL || 'superadmin@unlimitedtrekers.com'
  const name = process.env.SUPERADMIN_NAME || 'Super Admin'
  const phone = process.env.SUPERADMIN_PHONE || '0000000000'

  const superAdmin = new User({
    name,
    username,
    email,
    phone,
    role: 'admin',
    password,
  })

  await superAdmin.save()
  console.log(`Super admin created: ${username}`)
}
