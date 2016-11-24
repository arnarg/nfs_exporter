# NFS exporter

This exports metrics for an NFSv4 server. It reads from /proc/net/rpc/nfsd

## Metrics output

The following metrics are output

```
# HELP nfs_replycache_hits Number of hits in reply cache (client is retransmitting)
# TYPE nfs_replycache_hits gauge
nfs_replycache_hits{} 0
# HELP nfs_replycache_misses Number of misses in reply cache
# TYPE nfs_replycache_misses gauge
nfs_replycache_misses{} 0
# HELP nfs_replycache_nocache Number of operations that do no require cache in reply cache
# TYPE nfs_replycache_nocache gauge
nfs_replycache_nocache{} 70589
# HELP nfs_filehandle_stale Number of file handle errors
# TYPE nfs_filehandle_stale gauge
nfs_filehandle_stale{} 0
# HELP nfs_io_bytes_read Number of bytes read directly from disk
# TYPE nfs_io_bytes_read gauge
nfs_io_bytes_read{} 123093276
# HELP nfs_io_bytes_written Number of bytes written directly to disk
# TYPE nfs_io_bytes_written gauge
nfs_io_bytes_written{} 37726691
# HELP nfs_thread_count Number of nfsd threads
# TYPE nfs_thread_count gauge
nfs_thread_count{} 8
# HELP nfs_thread_full Number of times that all threads are busy
# TYPE nfs_thread_full gauge
nfs_thread_full{} 0
# HELP nfs_readahead_cache_size Size of read ahead cache
# TYPE nfs_readahead_cache_size gauge
nfs_readahead_cache_size{} 32
# HELP nfs_readahead_cache_not_found If someone knows how this number is represented please fix and send a pull request
# TYPE nfs_readahead_cache_not_found gauge
nfs_readahead_cache_not_found{} 0
# HELP nfs_net_reads Number of reads
# TYPE nfs_net_reads gauge
nfs_net_reads{} 70589
# HELP nfs_net_udp_packets Number of udp packets
# TYPE nfs_net_udp_packets gauge
nfs_net_udp_packets{} 0
# HELP nfs_net_tcp_packets Number of tcp packets
# TYPE nfs_net_tcp_packets gauge
nfs_net_tcp_packets{} 70590
# HELP nfs_net_tcp_conns Number of tcp connections
# TYPE nfs_net_tcp_conns gauge
nfs_net_tcp_conns{} 1
# HELP nfs_rpc_ops Number of rpc operations
# TYPE nfs_rpc_ops gauge
nfs_rpc_ops{} 70589
# HELP nfs_rpc_compound_ops Number of compound rpc operations
# TYPE nfs_rpc_compound_ops gauge
nfs_rpc_compound_ops{} 70589
# HELP nfs_op_acces Number of access operations
# TYPE nfs_op_acces gauge
nfs_op_acces{} 2731
# HELP nfs_op_close Number of close operations
# TYPE nfs_op_close gauge
nfs_op_close{} 640
# HELP nfs_op_commit Number of commit operations
# TYPE nfs_op_commit gauge
nfs_op_commit{} 13
# HELP nfs_op_create Number of create operations
# TYPE nfs_op_create gauge
nfs_op_create{} 110
# HELP nfs_op_read Number of read operations
# TYPE nfs_op_read gauge
nfs_op_read{} 971
# HELP nfs_op_open Number of open operations
# TYPE nfs_op_open gauge
nfs_op_open{} 886
# HELP nfs_op_write Number of write operations
# TYPE nfs_op_write gauge
nfs_op_write{} 223
# HELP nfs_op_rename Number of rename operations
# TYPE nfs_op_rename gauge
nfs_op_rename{} 70
# HELP nfs_op_remove Number of remove operations
# TYPE nfs_op_remove gauge
nfs_op_remove{} 0
```

## Running

This exporter is written in node.js.

Running is as simple as:

```
npm install
node index.js <optional_args>
```

### Usage

```
Usage: index.js [options]

Options:
  -n, --nfs   Location of nfsd proc file         [default: "/proc/net/rpc/nfsd"]
  -h, --help  Show help                                                [boolean]
  -p, --port                                                     [default: 9123]

Examples:
  index.js -p 9123 -n /proc/net/rpc/nfsd
```

## Docker

I have built a docker image for this exporter.

Because this exporter reads from `/proc/net` it needs to be run on the same machine as the NFS server and use the `--net=host` flag.

```
docker pull granra/nfs_exporter
docker run -p 9123:9123 --net=host granra/nfs_exporter
```
