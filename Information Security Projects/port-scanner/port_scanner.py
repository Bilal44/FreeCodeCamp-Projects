import socket
import re
from common_ports import ports_and_services

def get_open_ports(target, port_range, verbose=False):
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
        
    response = open_ports

    if (verbose):
      response = "Open ports for " + target
      for port in open_ports:
        service = ports_and_services.get(port)
        response += "\nPORT     SERVICE\n"+ str(port)+ "      " + service

    return(response)