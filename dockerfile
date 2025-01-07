# Use Nginx as a base image to serve the React app
FROM nginx:alpine

# Copy the pre-built React app (from your local build folder) into Nginx's web root
COPY path/to/your/react/build /usr/share/nginx/html

# Expose the port that Nginx will run on (default is 80)
EXPOSE 80

# Nginx will run by default, no CMD needed
