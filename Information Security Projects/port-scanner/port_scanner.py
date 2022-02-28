import socket
import re

def get_open_ports(target, port_range):
    open_ports = []

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    
    try:
      target = socket.gethostbyname(target)
    except:
      regex = re.compile("^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$")
      result = regex.match(target)
      if (result):
        return "Error: Invalid IP address"
      else:
        return "Error: Invalid hostname" 

    for port in range(port_range[0], port_range[1] + 1):
      try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.1)
        result = sock.connect_ex((target, port))
        if result == 0: 
          open_ports.append(port)
      except Exception as ex:
        print(ex)
        continue
      sock.close()

    return(open_ports)