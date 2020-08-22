interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'itamazor@gmail.com',
      name: 'Jr Bytes Developer',
    },
  },
} as IMailConfig
