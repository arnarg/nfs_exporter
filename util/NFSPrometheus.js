'use strict';

const Prometheus = require('prometheus-client');

function NFSPrometheus() {
	this.prom = new Prometheus();

	this.gauges = {
		rc: {
			hits: this.prom.newGauge({
				namespace: 'nfs',
				name: 'replycache_hits',
				help: 'Number of hits in reply cache (client is retransmitting)'
			}),
			misses: this.prom.newGauge({
				namespace: 'nfs',
				name: 'replycache_misses',
				help: 'Number of misses in reply cache'
			}),
			nocache: this.prom.newGauge({
				namespace: 'nfs',
				name: 'replycache_nocache',
				help: 'Number of operations that do no require cache in reply cache'
			})
		},

		fh: {
			stale: this.prom.newGauge({
				namespace: 'nfs',
				name: 'filehandle_stale',
				help: 'Number of file handle errors'
			})
		},

		io: {
			bytesRead: this.prom.newGauge({
				namespace: 'nfs',
				name: 'io_bytes_read',
				help: 'Number of bytes read directly from disk'
			}),
			bytesWritten: this.prom.newGauge({
				namespace: 'nfs',
				name: 'io_bytes_written',
				help: 'Number of bytes written directly to disk'
			})
		},

		th: {
			threads: this.prom.newGauge({
				namespace: 'nfs',
				name: 'thread_count',
				help: 'Number of nfsd threads'
			}),
			fullcnt: this.prom.newGauge({
				namespace: 'nfs',
				name: 'thread_full',
				help: 'Number of times that all threads are busy'
			})
		},

		ra: {
			cacheSize: this.prom.newGauge({
				namespace: 'nfs',
				name: 'readahead_cache_size',
				help: 'Size of read ahead cache'
			}),
			notFound: this.prom.newGauge({
				namespace: 'nfs',
				name: 'readahead_cache_not_found',
				help: 'If someone knows how this number is represented please fix and send a pull request'
			})
		},

		net: {
			readCount: this.prom.newGauge({
				namespace: 'nfs',
				name: 'net_reads',
				help: 'Number of reads'
			}),
			udpPacketCount: this.prom.newGauge({
				namespace: 'nfs',
				name: 'net_udp_packets',
				help: 'Number of udp packets'
			}),
			tcpPacketCount: this.prom.newGauge({
				namespace: 'nfs',
				name: 'net_tcp_packets',
				help: 'Number of tcp packets'
			}),
			tcpConnections: this.prom.newGauge({
				namespace: 'nfs',
				name: 'net_tcp_conns',
				help: 'Number of tcp connections'
			})
		},

		rpc: {
			rpcOps: this.prom.newGauge({
				namespace: 'nfs',
				name: 'rpc_ops',
				help: 'Number of rpc operations'
			})
		},

		proc4: {
			compound: this.prom.newGauge({
				namespace: 'nfs',
				name: 'rpc_compound_ops',
				help: 'Number of compound rpc operations'
			})
		},

		proc4ops: {
			access: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_acces',
				help: 'Number of access operations'
			}),
			close: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_close',
				help: 'Number of close operations'
			}),
			commit: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_commit',
				help: 'Number of commit operations'
			}),
			create: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_create',
				help: 'Number of create operations'
			}),
			read: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_read',
				help: 'Number of read operations'
			}),
			open: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_open',
				help: 'Number of open operations'
			}),
			write: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_write',
				help: 'Number of write operations'
			}),
			rename: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_rename',
				help: 'Number of rename operations'
			}),
			remove: this.prom.newGauge({
				namespace: 'nfs',
				name: 'op_remove',
				help: 'Number of remove operations'
			})
		}
	};
}

NFSPrometheus.prototype.getProm = function getProm() {
	return this.prom;
}

NFSPrometheus.prototype.setGauges = function setGauges(data) {
	this.gauges.rc.hits.set(null, data.reply_cache.hits);
	this.gauges.rc.misses.set(null, data.reply_cache.misses);
	this.gauges.rc.nocache.set(null, data.reply_cache.nocache);
	this.gauges.fh.stale.set(null, data.filehandle.stale);
	this.gauges.io.bytesRead.set(null, data.io.bytesRead);
	this.gauges.io.bytesWritten.set(null, data.io.bytesWritten);
	this.gauges.th.threads.set(null, data.threads.threads);
	this.gauges.th.fullcnt.set(null, data.threads.fullcnt);
	this.gauges.ra.cacheSize.set(null, data.read_ahead.cacheSize);
	this.gauges.ra.notFound.set(null, data.read_ahead.notFound);
	this.gauges.net.readCount.set(null, data.net.netcnt);
	this.gauges.net.udpPacketCount.set(null, data.net.netudpcnt);
	this.gauges.net.tcpPacketCount.set(null, data.net.nettcpcnt);
	this.gauges.net.tcpConnections.set(null, data.net.nettcpconn);
	this.gauges.rpc.rpcOps.set(null, data.rpc.rpccnt);
	this.gauges.proc4.compound.set(null, data.nfsv4.compound);
	this.gauges.proc4ops.access.set(null, data.nfsv4ops.access);
	this.gauges.proc4ops.close.set(null, data.nfsv4ops.close);
	this.gauges.proc4ops.commit.set(null, data.nfsv4ops.commit);
	this.gauges.proc4ops.create.set(null, data.nfsv4ops.create);
	this.gauges.proc4ops.read.set(null, data.nfsv4ops.read);
	this.gauges.proc4ops.open.set(null, data.nfsv4ops.open);
	this.gauges.proc4ops.write.set(null, data.nfsv4ops.write);
	this.gauges.proc4ops.rename.set(null, data.nfsv4ops.rename);
	this.gauges.proc4ops.remove.set(null, data.nfsv4ops.remove);
}

module.exports = NFSPrometheus;
