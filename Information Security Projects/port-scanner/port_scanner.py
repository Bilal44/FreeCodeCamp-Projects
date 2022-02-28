import socket

def get_open_ports(target, port_range):
    open_ports = []

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    
    targetIP = socket.gethostbyname(target)

    for port in port_range:
      try:
        result = sock.connect_ex((targetIP, port))
        if result == 0: 
          open_ports.append(port)
      except Exception as ex:
        print(ex)
        continue

    sock.close()

    return(open_ports)