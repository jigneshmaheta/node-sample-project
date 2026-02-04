# Node.js Application Deployment on Kubernetes (Minikube)

This repository demonstrates a complete DevOps workflow using Docker, Kubernetes (Minikube), CI/CD concepts, autoscaling, monitoring, and basic security practices.

The application is deployed in a staging namespace, with HPA already enabled. This README explains how to start the cluster, verify the deployment, expose the service, and test the application.



## Prerequisites

Make sure the following tools are installed on your system:

 Docker
 Minikube
 kubectl

Check versions:
minikube version
kubectl version --client
docker --version




## Step 1: Start Minikube Cluster

Start the local Kubernetes cluster using Minikube:

minikube start
Verify cluster status:
minikube status

## Step 2: Verify Namespace

The application is deployed in the staging namespace.

Check if namespace exists:
kubectl get ns
If `staging` is already present, no action is required.



## Step 3: Verify Running Pods

Check running pods in the staging namespace:
kubectl get pods -n staging



### Pod Explanation

 node-app-xxxxx → Application pods managed by a Deployment
 load-generator → Used to generate traffic and test autoscaling



## Step 4: Verify Deployment

Check deployment status:
kubectl get deployment -n staging
Describe deployment:
kubectl describe deployment node-app -n staging




## Step 5: Verify Service and Expose Application

Check service:
kubectl get svc -n staging

If using NodePort, get the service URL:

minikube service node-app-service -n staging


This command will open the application in the browser or return a URL like:


http://192.168.xx.xx:3xxxx




## Step 6: Test Application

### Option 1: Browser Test

Open the Minikube service URL in your browser.

### Option 2: Curl Test


curl http://<MINIKUBE_IP>:<NODE_PORT>


Expected result: Application response from Node.js app.



## Step 7: Horizontal Pod Autoscaler (HPA)

HPA is already configured and enabled.

Check HPA status:


kubectl get hpa -n staging


Describe HPA:


kubectl describe hpa node-app-hpa -n staging


HPA automatically scales pods based on CPU utilization.



## Step 8: Load Testing (Optional)

The load-generator pod sends continuous traffic to the application to trigger autoscaling.

Check logs:


kubectl logs load-generator -n staging


Monitor pod scaling:


kubectl get pods -n staging -w




## Step 9: Rollout and Rollback

### Check rollout history:
kubectl rollout history deployment node-app -n staging


### Rollback to previous version:

kubectl rollout undo deployment node-app -n staging


This ensures zero-downtime recovery in case of failure.



## Step 10: Security Basics

 Sensitive data is stored using Kubernetes Secrets
 No credentials are stored in plain  inside YAML files



## CI/CD Pipeline Overview

This project uses GitHub Actions to implement a simple and effective CI/CD pipeline that automates build, security scan, and deployment to the Minikube Kubernetes cluster.

### CI/CD Flow (High Level)

1. Code is pushed to the `main` branch
2. GitHub Actions pipeline is triggered
3. Docker image is built from the Dockerfile
4. Image is pushed to DockerHub
5. Image is scanned using Trivy for vulnerabilities
6. Kubernetes deployment is updated in the `staging` namespace
7. Rollout status is verified to ensure successful deployment

This pipeline ensures automation, consistency, and quick rollback using Kubernetes native rollout features.



## Dockerfile Overview

The application is containerized using a lightweight Node.js Alpine image for better performance and smaller image size.

### Dockerfile Steps Explained

 Uses `node:18-alpine` as the base image
 Sets `/app` as the working directory
 Installs only production dependencies
 Copies application source code
 Exposes port `3000`
 Starts the application using `npm start`

This Dockerfile follows best practices such as:

 Small image size
 Clean and simple build steps
 Production-only dependencies

## Summary
 Application deployed on Minikube Kubernetes cluster
 Uses staging namespace
 Autoscaling enabled using HPA
 Load testing supported
 Rollback mechanism implemented

This setup simulates a real-world DevOps staging environment.

Prometheus and grafana deployed on monitoring namespace 
Monitoring: kubectl port-forward -n monitoring svc/prometheus-server 9090:80

## Author
Jignesh Maheta
DevOps Engineer
