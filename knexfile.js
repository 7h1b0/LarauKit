/**
 * @param {{ type: string; length: number; string: () => string; }} field
 * @param {() => any} next
 */
function typeCast(field, next) {
  if (field.type === 'TINY' && field.length === 1) {
    return field.string() === '1';
  }
  return next();
}

const defaultProfil = {
  client: 'mysql',
  migrations: {
    directory: 'server/migrations'
  },
  seeds: {
    directory: 'server/seeds'
  },
  pool: { min: 0, max: 4 }
};

export default {
  test: {
    connection: {
      host: '127.0.0.1',
      port: 3306,
      database: 'larau-test',
      user: 'root',
      password: '',
      typeCast
    },
    ...defaultProfil
  },
  development: {
    connection: {
      host: '192.168.1.10',
      port: 3306,
      database: 'banque',
      user: 'larau',
      password: 'larau',
      typeCast
    },
    ...defaultProfil
  }
};
