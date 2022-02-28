import socket
import re
from common_ports import ports_and_services

def get_open_ports(target, port_range, verbose=False):
    open_ports = []
    
    if target[0].isdigit():
        isIP = True
    else:
        isIP = False    

    try:
      targetIP = socket.gethostbyname(target)
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

    if verbose:
      if isIP:
         target = socket.gethostbyaddr(target)[0]
      
      targetIP = f"{target} ({targetIP})"
      response = f"Open ports for {targetIP}\nPORT     SERVICE\n"
      space_length = 9 - len(str(port))
      
      for port in open_ports:
        service = ports_and_services.get(port)
        response += str(port) + space_length * ' ' + service
        if open_ports[len(open_ports) - 1] != port:
          response += "\n"

    return(response)