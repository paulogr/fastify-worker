function tasks (server, opts) {
  async function orderNew (job) {
    console.log(job.data)
  }

  async function orderApproved (job) {
    console.log(job.data)
  }

  async function orderCancelled (job) {
    console.log(job.data)
  }
  
  return {
    'order.new': orderNew,
    'order.approved': orderApproved,
    'order.cancelled': orderCancelled
  }
}

module.exports = {
  queue: 'portal.notifications',
  options: {},
  tasks
}
