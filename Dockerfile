# We base our image on the super lean and clean Alpine distro with Node 6.
FROM node:6-alpine

RUN mkdir -p /app/jenius-seed
WORKDIR /app/jenius-seed

ADD . .
RUN npm install

# We need to disable the babel cache, see:
# http://stackoverflow.com/questions/32757306/why-babel-stores-babel-json-in-userprofile-path/34025957#34025957
# https://github.com/rauchg/slackin/issues/136
ENV BABEL_DISABLE_CACHE 1

# Always EXPOSE the ports you will use, otherwise platforms like OpenShift
# will not be able to propose the correct ports to connect to.
ENV PORT 3000
EXPOSE 3000

# Most Dockerfiles really should only run a single process...
CMD ["npm", "start"]
