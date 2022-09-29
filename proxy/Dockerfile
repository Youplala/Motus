FROM haproxy:2.0.13
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
EXPOSE 3000
CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]