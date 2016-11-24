'use strict';

/* Info about /proc/net/rpc/nfsd: http://deepdivetech.blogspot.is/2012/01/nfs-procnetrpcnfsd-file-explained.html */

const helpers = {
	rc: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'reply_cache',
			data: {
				hits: parseInt(match[0]),
				misses: parseInt(match[1]),
				nocache: parseInt(match[2])
			}
		};
	},

	fh: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'filehandle',
			data: {
				stale: parseInt(match[0])
			}
		};
	},

	io: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'io',
			data: {
				bytesRead: parseInt(match[0]),
				bytesWritten: parseInt(match[1])
			}
		};
	},

	th: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'threads',
			data: {
				threads: parseInt(match[0]),
				fullcnt: parseInt(match[1])
			}
		};
	},

	ra: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'read_ahead',
			data: {
				cacheSize: parseInt(match[0]),
				notFound: parseInt(match[10])
			}
		};
	},

	net: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'net',
			data: {
				netcnt: parseInt(match[0]),
				netudpcnt: parseInt(match[1]),
				nettcpcnt: parseInt(match[2]),
				nettcpconn: parseInt(match[3])
			}
		};
	},

	rpc: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'rpc',
			data: {
				rpccnt: parseInt(match[0])
			}
		}
	},

	proc4: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'nfsv4',
			data: {
				compound: parseInt(match[2])
			}
		};
	},

	proc4ops: (data) => {
		const match = data.match(/(\d+)/g);
		return {
			name: 'nfsv4ops',
			data: {
				access: parseInt(match[4]),
				close: parseInt(match[5]),
				commit: parseInt(match[6]),
				create: parseInt(match[7]),
				delegpurge: parseInt(match[8]),
				delegreturn: parseInt(match[9]),
				getattr: parseInt(match[10]),
				getfh: parseInt(match[11]),
				link: parseInt(match[12]),
				lock: parseInt(match[13]),
				lockt: parseInt(match[14]),
				locku: parseInt(match[15]),
				lookup: parseInt(match[16]),
				lookup_root: parseInt(match[17]),
				nverify: parseInt(match[18]),
				open: parseInt(match[19]),
				openattr: parseInt(match[20]),
				open_conf: parseInt(match[21]),
				open_dgrd: parseInt(match[22]),
				putfh: parseInt(match[23]),
				putpubfh: parseInt(match[24]),
				putrootfh: parseInt(match[25]),
				read: parseInt(match[26]),
				readdir: parseInt(match[27]),
				readlink: parseInt(match[28]),
				remove: parseInt(match[29]),
				rename: parseInt(match[30]),
				renew: parseInt(match[31]),
				restorefh: parseInt(match[32]),
				savefh: parseInt(match[33]),
				secinfo: parseInt(match[34]),
				setattr: parseInt(match[35]),
				setcltid: parseInt(match[36]),
				setcltidconf: parseInt(match[37]),
				verify: parseInt(match[38]),
				write: parseInt(match[39]),
				rellockowner: parseInt(match[40]),
				bc_ctl: parseInt(match[41]),
				bind_conn: parseInt(match[42]),
				exchange_id: parseInt(match[43]),
				create_ses: parseInt(match[44]),
				destroy_ses: parseInt(match[45]),
				free_stateid: parseInt(match[46]),
				getdirdeleg: parseInt(match[47]),
				getdevinfo: parseInt(match[48]),
				getdevlist: parseInt(match[49]),
				layoutcommit: parseInt(match[50]),
				layoutget: parseInt(match[51]),
				layoutreturn: parseInt(match[52]),
				secinfononam: parseInt(match[53]),
				sequence: parseInt(match[54]),
				set_ssv: parseInt(match[55]),
				test_stateid: parseInt(match[56]),
				want_deleg: parseInt(match[57]),
				destroy_clid: parseInt(match[58]),
				reclaim_comp: parseInt(match[59])
			}
		};
	}
}

module.exports = {
	parse: (data) => {
		const ret = {};

		const lines = data.split('\n');

		lines.forEach(l => {
			const match = l.match(/^([\w\d]+)\s([\d\s\.]+)$/);

			if (match) {
				const key = match[1];
				const values = match[2];

				if (helpers[key]) {
					const helperData = helpers[key](values);

					ret[helperData.name] = helperData.data;
				}
			}
		});

		return ret;
	}
};
