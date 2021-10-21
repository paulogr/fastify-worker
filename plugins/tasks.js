const path = require('path')
const { readdir } = require('fs').promises

const fp = require('fastify-plugin')
const Queue = require('bull')

async function Tasks (server, opts) {
  const queues = {}

  const dir = path.join(__dirname, '..', 'tasks')
  const files = await readdir(dir)

  for (const f of files) {
    const config = require(path.join(dir, f))
    
    queues[config.queue] = new Queue(config.queue, config.opts)
    const tasks = config.tasks(server, opts)
    
    for (const [name, handler] of Object.entries(tasks)) {
      queues[config.queue].process(name, 1, (job) => handler(job))
    }
  }

  // not working
  server.addHook('onClose', async function (server,) {
    for (const q of Object.values(queues)) {
      await q.close()
    }
  })

  server.decorate('tasks', function (queue) {
    return {
      add (name, data) {
        return queues[queue].add(name, data)
      }
    }
  })
}

module.exports = fp(Tasks, {
  name: 'tasks'
})
