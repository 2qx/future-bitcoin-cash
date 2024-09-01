import{$ as S,e as I,M as R,w as A}from"./SvelteToast.svelte_svelte_type_style_lang.BJk-PTIB.js";async function q(n){if("clipboard"in navigator)await navigator.clipboard.writeText(n);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=n,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const j=(n,e)=>{async function t(){if(s)try{await q(s),n.dispatchEvent(new CustomEvent("svelte-copy",{detail:s}))}catch(o){n.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let i=typeof e=="string"?["click"]:[e.events].flat(1),s=typeof e=="string"?e:e.text;return i.forEach(o=>{n.addEventListener(o,t,!0)}),{update:o=>{const c=typeof o=="string"?["click"]:[o.events].flat(1),d=typeof o=="string"?o:o.text,a=c.filter(l=>!i.includes(l)),f=i.filter(l=>!c.includes(l));a.forEach(l=>{n.addEventListener(l,t,!0)}),f.forEach(l=>{n.removeEventListener(l,t,!0)}),i=c,s=d},destroy:()=>{i.forEach(o=>{n.removeEventListener(o,t,!0)})}}};function E(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}const $={client:S("electrum-cash:client "),cluster:S("electrum-cash:cluster"),errors:S("electrum-cash:error  "),warning:S("electrum-cash:warning"),network:S("electrum-cash:network"),ping:S("electrum-cash:pulses ")};$.client.color="2";$.cluster.color="3";$.errors.color="9";$.warning.color="13";$.network.color="4";$.ping.color="8";var r=$;class M{static buildRequestObject(e,t,i){return JSON.stringify({method:e,params:t,id:i})}static get versionRegexp(){return/^\d+(\.\d+)+$/}static get statementDelimiter(){return`
`}}var w=M,L={};E(L,"isVersionRejected",()=>O);E(L,"isVersionNegotiated",()=>U);const O=function(n){return"error"in n},U=function(n){return"software"in n&&"protocol"in n};var P={};E(P,"ElectrumTransport",()=>m);E(P,"DefaultParameters",()=>u);var N={};E(N,"ClusterOrder",()=>T);E(N,"ClusterDistribution",()=>C);E(N,"ClusterStatus",()=>p);E(N,"ClientState",()=>v);E(N,"ConnectionStatus",()=>h);var T;(function(n){n[n.RANDOM=0]="RANDOM",n[n.PRIORITY=1]="PRIORITY"})(T||(T={}));var C;(function(n){n[n.ALL=0]="ALL"})(C||(C={}));var p;(function(n){n[n.DISABLED=0]="DISABLED",n[n.DEGRADED=1]="DEGRADED",n[n.READY=2]="READY"})(p||(p={}));var v;(function(n){n[n.UNAVAILABLE=0]="UNAVAILABLE",n[n.AVAILABLE=1]="AVAILABLE"})(v||(v={}));var h;(function(n){n[n.DISCONNECTED=0]="DISCONNECTED",n[n.CONNECTED=1]="CONNECTED",n[n.DISCONNECTING=2]="DISCONNECTING",n[n.CONNECTING=3]="CONNECTING",n[n.RECONNECTING=4]="RECONNECTING"})(h||(h={}));const m={TCP:{Port:50001,Scheme:"tcp"},TCP_TLS:{Port:50002,Scheme:"tcp_tls"},WS:{Port:50003,Scheme:"ws"},WSS:{Port:50004,Scheme:"wss"}},u={PORT:m.TCP_TLS.Port,TRANSPORT_SCHEME:m.TCP_TLS.Scheme,RECONNECT:15e3,TIMEOUT:12e4,PING_INTERVAL:3e3,CLUSTER_CONFIDENCE:1,CLUSTER_DISTRIBUTION:C.ALL,CLUSTER_ORDER:T.RANDOM};class _ extends I.EventEmitter{connect(e,t,i,s){if(this.tcpSocket||this.webSocket)throw new Error("Cannot initiate a new socket connection when an existing connection exists");this.timers.disconnect=setTimeout(()=>this.disconnectOnTimeout(e,t,s),s),this.once("connect",this.clearDisconnectTimerOnTimeout);const o={[m.TCP.Scheme]:"a TCP Socket",[m.TCP_TLS.Scheme]:"an encrypted TCP socket",[m.WS.Scheme]:"a WebSocket",[m.WSS.Scheme]:"an encrypted WebSocket"};if(r.network(`Initiating ${o[i]} connection to '${e}:${t}'.`),i===m.TCP.Scheme||i===m.TCP_TLS.Scheme){if(i===m.TCP_TLS.Scheme){const c={rejectUnauthorized:!1};$4QiMX$isIP(e)||(c.serverName=e),this.tcpSocket=$4QiMX$connect(t,e,c),this.tcpSocket.once("secureConnect",()=>{if(!(this.tcpSocket instanceof $4QiMX$TLSSocket))return;this.tcpSocket.authorizationError==="DEPTH_ZERO_SELF_SIGNED_CERT"&&r.warning(`Connection to ${e}:${t} uses a self-signed certificate`)}),this.tcpSocket.on("secureConnect",this.onConnect.bind(this,o[i],e,t))}else this.tcpSocket=$4QiMX$connect1({host:e,port:t}),this.tcpSocket.on("connect",this.onConnect.bind(this,o[i],e,t));this.tcpSocket.setEncoding("utf8"),this.tcpSocket.setKeepAlive(!0,0),this.tcpSocket.setNoDelay(!0),this.tcpSocket.on("error",this.eventForwarders.tcpError)}else if(i===m.WS.Scheme||i===m.WSS.Scheme)i===m.WSS.Scheme?this.webSocket=new A(`wss://${e}:${t}`):this.webSocket=new A(`ws://${e}:${t}`),this.webSocket.addEventListener("open",this.onConnect.bind(this,o[i],e,t)),this.webSocket.addEventListener("error",this.eventForwarders.wsError);else throw new Error("Incorrect transport specified")}onConnect(e,t,i){this.onConnectHasRun||(r.network(`Established ${e} connection with '${t}:${i}'.`),typeof this.tcpSocket<"u"?(this.tcpSocket.addListener("close",this.eventForwarders.disconnect),this.tcpSocket.addListener("data",this.eventForwarders.tcpData)):typeof this.webSocket<"u"&&(this.webSocket.addEventListener("close",this.eventForwarders.disconnect),this.webSocket.addEventListener("message",this.eventForwarders.wsData)),this.onConnectHasRun=!0,this.emit("connect"))}clearDisconnectTimerOnTimeout(){this.timers.disconnect&&clearTimeout(this.timers.disconnect)}disconnect(){if(this.clearDisconnectTimerOnTimeout(),this.tcpSocket)this.tcpSocket.removeListener("close",this.eventForwarders.disconnect),this.tcpSocket.removeListener("data",this.eventForwarders.tcpData),this.tcpSocket.removeListener("error",this.eventForwarders.tcpError),this.tcpSocket.destroy(),this.tcpSocket=void 0;else if(this.webSocket)try{this.webSocket.removeEventListener("close",this.eventForwarders.disconnect),this.webSocket.removeEventListener("message",this.eventForwarders.wsData),this.webSocket.removeEventListener("error",this.eventForwarders.wsError),this.webSocket.close()}catch{}finally{this.webSocket=void 0}this.onConnectHasRun=!1,this.emit("disconnect")}write(e,t){if(this.tcpSocket)return this.tcpSocket.write(e,t);if(this.webSocket)return this.webSocket.send(e,t),!0;throw new Error("Cannot write to socket when there is no active connection")}disconnectOnTimeout(e,t,i){this.removeListener("connect",this.clearDisconnectTimerOnTimeout);const s={code:"ETIMEDOUT",message:`Connection to '${e}:${t}' timed out after ${i} milliseconds`};this.emit("error",s),this.disconnect()}constructor(...e){super(...e),this.timers={},this.onConnectHasRun=!1,this.eventForwarders={disconnect:()=>this.emit("disconnect"),tcpData:t=>this.emit("data",t),wsData:t=>this.emit("data",`${t.data}
`),tcpError:t=>this.emit("error",t),wsError:t=>this.emit("error",t.error)}}}var B=_;class F extends I.EventEmitter{constructor(e,t,i,s=u.PORT,o=u.TRANSPORT_SCHEME,c=u.TIMEOUT,d=u.PING_INTERVAL,a=u.RECONNECT){if(super(),this.application=e,this.version=t,this.host=i,this.port=s,this.scheme=o,this.timeout=c,this.pingInterval=d,this.reconnectInterval=a,this.timers={},this.verifications=[],this.status=h.DISCONNECTED,this.messageBuffer="",!w.versionRegexp.test(t))throw new Error(`Provided version string (${t}) is not a valid protocol version number.`);this.createSocket(),typeof document<"u"&&document.addEventListener("visibilitychange",this.handleVisibilityChange.bind(this))}get hostIdentifier(){return`${this.host}:${this.port}`}createSocket(){this.socket=new B,this.socket.on("connect",this.onSocketConnect.bind(this)),this.socket.on("disconnect",this.onSocketDisconnect.bind(this)),this.socket.on("data",this.parseMessageChunk.bind(this))}destroySocket(){this.socket.disconnect()}parseMessageChunk(e){for(this.lastReceivedTimestamp=Date.now(),this.verifications.forEach(t=>clearTimeout(t)),this.verifications.length=0,this.messageBuffer+=e;this.messageBuffer.includes(w.statementDelimiter);){const t=this.messageBuffer.split(w.statementDelimiter);for(;t.length>1;){const i=String(t.shift());let s=JSON.parse(i);for(Array.isArray(s)||(s=[s]);s.length>0;){const o=s.shift();if(o.id==="versionNegotiation"){o.error?this.emit("version",{error:o.error}):this.emit("version",{software:o.result[0],protocol:o.result[1]});continue}o.id!=="keepAlive"&&this.emit("statement",o)}}this.messageBuffer=t.shift()||""}}ping(){r.ping(`Sending keep-alive ping to '${this.hostIdentifier}'`);const e=w.buildRequestObject("server.ping",[],"keepAlive");return this.send(e)}async connect(){if(this.status===h.CONNECTED)return;this.status=h.CONNECTING;const e=(t,i)=>{const s=c=>{this.status=h.DISCONNECTED,i(c)};this.socket.removeAllListeners("error"),this.socket.once("error",s);const o=()=>{r.network(`Requesting protocol version ${this.version} with '${this.hostIdentifier}'.`),this.socket.removeListener("error",s);const c=w.buildRequestObject("server.version",[this.application,this.version],"versionNegotiation"),d=a=>{if(O(a)){this.disconnect(!0);const f="unsupported protocol version.";r.errors(`Failed to connect with ${this.hostIdentifier} due to ${f}`),i(f)}else if(a.protocol!==this.version&&`${a.protocol}.0`!==this.version&&`${a.protocol}.0.0`!==this.version){this.disconnect(!0);const f=`incompatible protocol version negotiated (${a.protocol} !== ${this.version}).`;r.errors(`Failed to connect with ${this.hostIdentifier} due to ${f}`),i(f)}else r.network(`Negotiated protocol version ${a.protocol} with '${this.hostIdentifier}', powered by ${a.software}.`),this.status=h.CONNECTED,this.emit("connect"),t()};this.once("version",d),this.send(c)};this.socket.once("connect",o),this.socket.on("error",this.onSocketError.bind(this)),this.socket.connect(this.host,this.port,this.scheme,this.timeout)};await new Promise(e)}async reconnect(){await this.clearReconnectTimer(),r.network(`Trying to reconnect to '${this.hostIdentifier}'..`),this.status=h.RECONNECTING,this.destroySocket(),this.createSocket();try{await this.connect()}catch{}}clearReconnectTimer(){this.timers.reconnect&&clearTimeout(this.timers.reconnect),this.timers.reconnect=void 0}clearKeepAliveTimer(){this.timers.keepAlive&&clearTimeout(this.timers.keepAlive),this.timers.keepAlive=void 0}setupKeepAliveTimer(){this.timers.keepAlive||(this.timers.keepAlive=setTimeout(this.ping.bind(this),this.pingInterval))}async disconnect(e=!1,t=!0){if(this.status===h.DISCONNECTED&&!e)return!1;t&&(this.status=h.DISCONNECTING),await this.clearKeepAliveTimer(),await this.clearReconnectTimer();const i=s=>{this.once("disconnect",()=>s(!0)),this.destroySocket()};return new Promise(i)}async handleVisibilityChange(){document.visibilityState==="hidden"&&this.disconnect(!0,!1),document.visibilityState==="visible"&&this.reconnect()}send(e){this.clearKeepAliveTimer();const t=Date.now(),i=setTimeout(this.verifySend.bind(this,t),this.timeout);return this.verifications.push(i),this.setupKeepAliveTimer(),this.socket.write(e+w.statementDelimiter)}verifySend(e){if(Number(this.lastReceivedTimestamp)<e){if(this.status===h.DISCONNECTED||this.status===h.DISCONNECTING){r.errors(`Tried to verify already disconnected connection to '${this.hostIdentifier}'`);return}this.clearKeepAliveTimer(),r.network(`Connection to '${this.hostIdentifier}' timed out.`),this.socket.disconnect()}}onSocketConnect(){this.clearReconnectTimer(),this.lastReceivedTimestamp=Date.now(),this.setupKeepAliveTimer(),this.socket.removeAllListeners("error"),this.socket.on("error",this.onSocketError.bind(this))}onSocketDisconnect(){this.emit("disconnect"),this.clearKeepAliveTimer(),this.status===h.DISCONNECTING?(this.clearReconnectTimer(),this.removeAllListeners(),this.status=h.DISCONNECTED,r.network(`Disconnected from '${this.hostIdentifier}'.`)):(this.status===h.CONNECTED&&r.errors(`Connection with '${this.hostIdentifier}' was closed, trying to reconnect in ${this.reconnectInterval/1e3} seconds.`),this.status=h.DISCONNECTED,this.timers.reconnect||(this.timers.reconnect=setTimeout(this.reconnect.bind(this),this.reconnectInterval)))}onSocketError(e){if(!(typeof e>"u")){if(e.code==="EAI_AGAIN"){r.errors(`Failed to look up DNS records for '${this.host}'.`);return}if(e.code==="ETIMEDOUT"){r.errors(e.message);return}r.errors(`Unknown network error ('${this.hostIdentifier}'): `,e)}}}var V=F;const G=function(n){return"id"in n&&"error"in n},W=function(n){return!("id"in n)&&"method"in n};class z extends I.EventEmitter{constructor(e,t,i,s=u.PORT,o=u.TRANSPORT_SCHEME,c=u.TIMEOUT,d=u.PING_INTERVAL,a=u.RECONNECT){super(),this.subscriptionMethods={},this.requestId=0,this.requestResolvers={},this.connectionLock=new R,this.connection=new V(e,t,i,s,o,c,d,a)}async connect(){const e=await this.connectionLock.acquire();try{if(this.connection.status===h.CONNECTED)return;this.connection.on("statement",this.response.bind(this)),this.connection.on("connect",this.resubscribeOnConnect.bind(this)),this.connection.on("connect",this.emit.bind(this,"connected")),this.connection.on("disconnect",this.onConnectionDisconnect.bind(this)),this.connection.on("error",this.emit.bind(this,"error")),await this.connection.connect()}finally{e()}}async disconnect(e=!1,t=!1){const i=await this.connectionLock.acquire();try{t||(this.removeAllListeners(),this.subscriptionMethods={});for(const s in this.requestResolvers){const o=this.requestResolvers[s];o(new Error("Manual disconnection")),delete this.requestResolvers[s]}return await this.connection.disconnect(e)}finally{i()}}async request(e,...t){if(this.connection.status!==h.CONNECTED)throw new Error(`Unable to send request to a disconnected server '${this.connection.host}'.`);this.requestId+=1;const i=this.requestId,s=w.buildRequestObject(e,t,i),o=c=>{this.requestResolvers[i]=(d,a)=>{c(d||a)},this.connection.send(s)};return r.network(`Sending request '${e}' to '${this.connection.host}'`),new Promise(o)}async subscribe(e,...t){this.subscriptionMethods[e]||(this.subscriptionMethods[e]=new Set),this.subscriptionMethods[e].add(JSON.stringify(t));const i=await this.request(e,...t),s={jsonrpc:"2.0",method:e,params:[...t,i]};this.emit("notification",s)}async unsubscribe(e,...t){if(this.connection.status!==h.CONNECTED)throw new Error(`Unable to send unsubscribe request to a disconnected server '${this.connection.host}'.`);if(!this.subscriptionMethods[e])throw new Error(`Cannot unsubscribe from '${e}' since the method has no subscriptions.`);const i=JSON.stringify(t);if(!this.subscriptionMethods[e].has(i))throw new Error(`Cannot unsubscribe from '${e}' since it has no subscription with the given parameters.`);this.subscriptionMethods[e].delete(i),await this.request(e.replace(".subscribe",".unsubscribe"),...t),r.client(`Unsubscribed from '${String(e)}' for the '${i}' parameters.`)}async resubscribeOnConnect(){r.client(`Connected to '${this.connection.hostIdentifier}'.`);const e=[];for(const t in this.subscriptionMethods){for(const i of this.subscriptionMethods[t].values()){const s=JSON.parse(i);e.push(this.subscribe(t,...s))}await Promise.all(e)}e.length>0&&r.client(`Restored ${e.length} previous subscriptions for '${this.connection.hostIdentifier}'`)}response(e){if(W(e)){r.client(`Received notification for '${e.method}' from '${this.connection.host}'`),this.emit("notification",e);return}if(e.id===null)throw new Error("Internal error: Received an RPC response with ID null.");const t=this.requestResolvers[e.id];if(!t)throw new Error("Internal error: Callback for response not available.");delete this.requestResolvers[e.id],G(e)?t(new Error(e.error.message)):t(void 0,e.result)}onConnectionDisconnect(){this.emit("disconnected");for(const e in this.requestResolvers){const t=this.requestResolvers[e];t(new Error("Connection lost")),delete this.requestResolvers[e]}}}var K=z;class H extends I.EventEmitter{constructor(e,t,i=u.CLUSTER_CONFIDENCE,s=u.CLUSTER_DISTRIBUTION,o=u.CLUSTER_ORDER,c=u.TIMEOUT,d=u.PING_INTERVAL,a=u.RECONNECT){super(),this.application=e,this.version=t,this.confidence=i,this.distribution=s,this.order=o,this.timeout=c,this.pingInterval=d,this.reconnectInterval=a,this.clients={},this.connections=0,this.notifications={},this.status=p.DISABLED,this.requestCounter=0,this.requestPromises={},this.requestLock=new R,this.responseLock=new R,r.cluster(`Initialized empty cluster (${i} of ${s||"ALL"})`),(s===C.ALL||i/s<=.5)&&r.warning(`Subscriptions might return multiple valid responses when confidence (${i}) is less than 51% of distribution.`)}async addServer(e,t=u.PORT,i=u.TRANSPORT_SCHEME,s=!0){const o=new K(this.application,this.version,e,t,i,this.timeout,this.pingInterval,this.reconnectInterval),c=`${e}:${t}`;this.clients[c]={state:v.UNAVAILABLE,connection:o};const d=()=>{const l=Math.max(this.confidence,this.distribution);this.connections>=l?this.status!==p.READY&&(this.status=p.READY,this.emit("ready"),r.cluster(`Cluster status is ready (currently ${this.connections} of ${l} connections available.)`)):this.connections>=this.confidence?this.status!==p.DEGRADED&&(this.status=p.DEGRADED,this.emit("degraded"),r.cluster(`Cluster status is degraded (only ${this.connections} of ${l} connections available.)`)):this.status!==p.DISABLED&&(this.status=p.DISABLED,this.emit("disabled"),r.cluster(`Cluster status is disabled (only ${this.connections} of the ${l} connections are available.)`))},a=async()=>{try{o.connection.status===h.CONNECTED&&(this.clients[c].state===v.UNAVAILABLE&&(this.connections+=1),this.clients[c].state=v.AVAILABLE,d())}catch{}},f=()=>{this.clients[c].state===v.AVAILABLE&&(this.connections-=1),this.clients[c].state=v.UNAVAILABLE,d()};if(o.connection.on("connect",a.bind(this)),o.connection.on("disconnect",f.bind(this)),o.on("notification",this.handleSubscriptionNotifications.bind(this,c)),s)try{await o.connect()}catch(l){r.cluster(`Failed to connect with ${e}: ${l}`)}}async request(e,...t){if(this.status===p.DISABLED)throw new Error(`Cannot request '${e}' when available clients (${this.connections}) is less than required confidence (${this.confidence}).`);const i=await this.requestLock.acquire();let s=0;try{this.requestCounter+=1,s=this.requestCounter}finally{i()}this.requestPromises[s]=[];const o=Object.keys(this.clients).filter(f=>this.clients[f].state===v.AVAILABLE);let c=0,d=this.distribution||o.length;for(this.status===p.DEGRADED&&(d=o.length);c<d;){let f=0;this.order===T.RANDOM&&(f=Math.floor(Math.random()*o.length));const[l]=o.splice(f,1),k=this.clients[l].connection.request(e,...t);this.requestPromises[s].push(k),c+=1}const a=(f,l)=>{const k=async()=>{const y={};let g=0;for(const x in this.requestPromises[s]){let D;try{const b=[this.requestPromises[s][x],Promise.resolve(void 0)];D=await Promise.race(b)}catch{g+=1;continue}if(D!==void 0){const b=JSON.stringify(D);if(g+=1,y[b]===void 0?y[b]=1:y[b]+=1,y[b]===this.confidence){r.cluster(`Validated response for '${e}' with sufficient integrity (${this.confidence}).`),f(D);return}}}if(g===this.requestPromises[s].length){l(new Error(`Unable to complete request for '${e}', response failed to reach sufficient integrity (${this.confidence}).`));return}setTimeout(k,1e3)};k()};return new Promise(a)}async subscribe(e,...t){for(const i in this.clients){const s=this.clients[i].connection;try{await s.subscribe(e,...t)}catch{}}}async unsubscribe(e,...t){const i=[];for(const s in this.clients){const o=this.clients[s].connection;i.push(o.unsubscribe(e,...t))}await Promise.all(i)}async handleSubscriptionNotifications(e,t){const i=await this.responseLock.acquire();try{const s=JSON.stringify(t);this.notifications[s]===void 0&&(this.notifications[s]=new Set),this.notifications[s].add(e),this.notifications[s].size===this.confidence&&(r.cluster(`Validated notification for '${t.method}' with sufficient integrity (${this.confidence}).`),this.emit("notification",t),setTimeout(this.dismissSubscriptionNotification.bind(this,s),this.timeout)),this.notifications[s].size===this.distribution&&this.dismissSubscriptionNotification(s)}finally{i()}}async dismissSubscriptionNotification(e){delete this.notifications[e]}async ready(){const e=Date.now(),t=i=>{const s=()=>{if(this.status===p.READY){i(!0);return}if(Date.now()-e>this.timeout){i(!1);return}setTimeout(s,50)};s()};return new Promise(t)}async startup(){r.cluster("Starting up cluster.");const e=[];for(const t in this.clients){const{host:i,port:s,scheme:o}=this.clients[t].connection.connection;this.clients[t].state===v.AVAILABLE?r.warning(`Called startup(), but server ${i}:${s} is already connected`):e.push(this.addServer(i,s,o))}return Promise.all(e)}async shutdown(e=!1){r.cluster("Shutting down cluster.");const t=[],i=s=>{this.once("disabled",()=>s(Promise.all(t)));for(const o in this.clients)t.push(this.clients[o].connection.disconnect(!0,e))};return new Promise(i)}}var Y=H;const Q="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20xmlns:dc='http://purl.org/dc/elements/1.1/'%20xmlns:cc='http://creativecommons.org/ns%23'%20xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23'%20xmlns:svg='http://www.w3.org/2000/svg'%20xmlns='http://www.w3.org/2000/svg'%20height='40'%20viewBox='0%20-960%20960%20960'%20width='40'%20version='1.1'%20id='svg1584'%3e%3cmetadata%20id='metadata1590'%3e%3crdf:RDF%3e%3ccc:Work%20rdf:about=''%3e%3cdc:format%3eimage/svg+xml%3c/dc:format%3e%3cdc:type%20rdf:resource='http://purl.org/dc/dcmitype/StillImage'%20/%3e%3cdc:title%3e%3c/dc:title%3e%3c/cc:Work%3e%3c/rdf:RDF%3e%3c/metadata%3e%3cdefs%20id='defs1588'%20/%3e%3crect%20style='fill:%238dc351;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:round;stroke-opacity:0.00392157'%20id='rect988'%20width='960'%20height='960'%20x='-1.5108347e-16'%20y='-960'%20rx='9798.04'%20ry='960'%20/%3e%3cg%20transform='matrix(0.05649551,0,0,0.05649551,34.309165,-945.515)'%20fill='%23ffffff'%20id='g56-1-2'%20style='stroke-width:0.735607'%3e%3cpath%20d='m%207751,13046%20c%20-6,-17%20-62,-222%20-127,-456%20-195,-713%20-262,-951%20-266,-956%20-3,-2%20-398,103%20-879,234%20-481,131%20-875,238%20-877,237%20-3,-3%20-112,-1041%20-112,-1071%200,-17%208,-23%2033,-28%2075,-14%20558,-147%20627,-172%20101,-38%20181,-113%20204,-193%2028,-95%2021,-155%20-43,-390%20-33,-119%20-139,-504%20-236,-856%20-97,-352%20-239,-867%20-315,-1145%20-76,-278%20-193,-703%20-260,-945%20-67,-242%20-142,-514%20-166,-605%20-25,-91%20-57,-185%20-72,-210%20-44,-77%20-110,-138%20-190,-177%20-67,-34%20-84,-38%20-171,-41%20-134,-6%20-233,16%20-734,162%20-81,23%20-120,30%20-122,22%20-7,-20%20-247,-901%20-249,-910%200,-4%2087,-33%20194,-62%20107,-30%20499,-138%20870,-241%20371,-102%20678,-189%20682,-192%204,-3%20-81,-323%20-188,-711%20-107,-388%20-192,-710%20-190,-715%202,-6%2028,-17%2057,-24%2030,-8%20222,-61%20428,-117%20206,-57%20376,-103%20377,-101%201,1%2088,315%20193,697%20106,382%20194,696%20196,698%202,2%20137,-35%20302,-83%20164,-48%20318,-92%20343,-100%2035,-10%2044,-17%2042,-31%20-2,-11%20-87,-320%20-188,-689%20-101,-368%20-184,-674%20-184,-680%200,-9%20858,-250%20865,-243%202,2%2091,322%20198,711%20107,389%20196,710%20199,712%202,3%2042,-2%2089,-10%20416,-74%20899,-94%201184,-51%20672,104%201078,440%201283,1061%20196,592%2097,1085%20-302,1499%20l%20-73,76%20h%20118%20c%20828,0%201344,393%201564,1190%20130,470%20135,910%2015,1273%20-41,126%20-137,313%20-218,427%20-145,205%20-419,444%20-699,612%20-277,166%20-754,378%20-1083,483%20-30,10%20-58,20%20-62,24%20-4,3%2071,290%20166,636%2096,347%20185,671%20198,721%20l%2025,91%20-426,117%20c%20-234,64%20-431,116%20-436,116%20-6,0%20-98,-318%20-204,-707%20-107,-390%20-195,-709%20-196,-710%20-1,-2%20-143,35%20-316,81%20-173,46%20-329,87%20-346,91%20-18,3%20-33,12%20-33,18%200,11%2016,68%20259,952%2071,259%20128,471%20126,473%20-1,1%20-196,56%20-433,121%20l%20-431,118%20z%20m%20442,-2762%20c%20928,-243%201429,-470%201733,-785%2093,-98%20132,-151%20179,-252%2054,-113%2070,-186%2069,-317%200,-211%20-79,-419%20-214,-563%20-317,-339%20-883,-384%20-1824,-143%20-226,58%20-696,197%20-696,207%200,4%20117,433%20260,953%20143,520%20260,948%20260,951%200,10%2022,5%20233,-51%20z%20M%207391,7495%20c%20657,-172%201015,-321%201295,-540%2097,-76%20161,-145%20225,-243%2060,-91%2087,-161%20107,-277%2019,-113%207,-234%20-39,-369%20-102,-305%20-310,-473%20-660,-532%20-82,-13%20-140,-16%20-298,-11%20-227,6%20-400,32%20-681,103%20-171,42%20-609,170%20-618,179%20-4,4%20126,484%20431,1588%2024,87%2046,147%2053,147%206,0%2090,-20%20185,-45%20z'%20fill='%23ffffff'%20id='path54-2-8'%20style='stroke-width:0.541117'%20/%3e%3c/g%3e%3c/svg%3e";export{Y as $,T as a,m as b,j as c,Q as d};
//# sourceMappingURL=bch.CeuV4F9I.js.map
