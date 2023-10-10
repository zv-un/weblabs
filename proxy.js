import { createServer, request } from "http";

const targetHost = "localhost";
const targetPort = 3000;

createServer((clientReq, clientRes) => {
  const options = {
    hostname: targetHost,
    port: targetPort,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  const proxy = request(options, (res) => {
    clientRes.writeHead(res.statusCode, res.headers);
    res.pipe(clientRes, {
      end: true,
    });
  });

  clientReq.pipe(proxy, {
    end: true,
  });

  proxy.on("error", (err) => {
    console.error("Proxy error:", err);
    clientRes.writeHead(500);
    clientRes.end();
  });
}).listen(80, () => {
  console.log("Proxy server listening on port 80");
});
