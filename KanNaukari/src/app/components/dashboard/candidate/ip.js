export default function handler(req, res) {
    console.log("Request received from IP:", req.socket.remoteAddress);
    const ipAddress =  req.socket.remoteAddress;
    res.status(200).json({ ip: ipAddress });
  }