FROM nginx:1.21.0-alpine
COPY docker-files/nginx.conf /etc/nginx/
COPY docker-files/blockbots.conf /etc/nginx/conf/
COPY docker-files/botlimit.conf /etc/nginx/conf/
COPY /dist/flex-ui/  /opt/www
#COPY /elements/ /opt/www/elements/
# Make sure the important files/directories are owned by the nobody user

RUN touch /var/run/nginx.pid && \
  chown -R nobody:nobody /var/run/nginx.pid && \
  chown -R nobody:nobody /var/cache/nginx && \
  chown -R nobody:nobody /opt/www

# Uses port 8080 so the unprivileged nobody user can attach to it

EXPOSE 8080

# Kubernetes does not recognize text usernames so the uid of the nobody user is entered here
USER 65534

# Start nginx
CMD nginx
