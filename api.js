async function api (server, opts) {
  server.register(require('./plugins/tasks'))

  server.route({
    path: '/queue',
    method: 'POST',
    async handler(req, reply) {
      const { queue, name, data } = req.body

      server.tasks(queue).add(name, data)
      
      return { ok: true, timestamp: new Date().toISOString() }
    }
  })

}

module.exports = api