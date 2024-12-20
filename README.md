# Proyecto Next.js v15.0.3

Este proyecto utiliza Next.js en su versión 15.0.3 y está configurado para desplegarse en AWS utilizando AWS CloudFormation, S3 y CloudFront.

## Tabla de contenidos
1. [Requisitos previos](#requisitos-previos)
2. [Clonar el proyecto](#clonar-el-proyecto)
3. [Configuración local](#configuración-local)
4. [Despliegue en AWS](#despliegue-en-aws)
5. [Subida de archivos estáticos a S3](#subida-de-archivos-estáticos-a-s3)
6. [Distribución con CloudFront](#distribución-con-cloudfront)
7. [Configuración de CI/CD con GitHub Actions](#configuración-de-cicd-con-github-actions)

---

## Requisitos previos
- Node.js (v18 o superior)
- npm o yarn
- Cuenta de AWS con permisos para usar S3, CloudFront y CloudFormation
- AWS CLI instalado y configurado

---

## Clonar el proyecto

1. Abre tu terminal.
2. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
3. Entra al directorio del proyecto:
   ```bash
   cd <NOMBRE_DEL_PROYECTO>
   ```

---

## Configuración local

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   # o
   yarn install
   ```

2. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables (reemplaza los valores según tu entorno):
   ```env
   NEXT_PUBLIC_API_GATEWAY_ENDPOINT=https://<ENDPOINT_DE_TU_API_GATEWAY>
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
4. Accede al proyecto en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## Despliegue en AWS

### 1. Configurar las credenciales de AWS
Asegúrate de tener configuradas tus credenciales de AWS:
```bash
aws configure
```
Ingresa:
- Access Key ID
- Secret Access Key
- Region

### 2. Configurar el despliegue en CloudFormation

1. Asegúrte de tener un archivo de plantilla CloudFormation (`nextjs-iac-template.yml`) listo en el proyecto.
2. Despliega la plantilla:
   ```bash
   aws cloudformation create-stack \
       --stack-name nextjs-app-stack \
       --template-body file://nextjs-iac-template.yml \
       --capabilities CAPABILITY_NAMED_IAM
   ```

### 3. Verificar el estado del stack
Puedes verificar el estado del stack ejecutando:
```bash
aws cloudformation describe-stacks --stack-name nextjs-app-stack
```

---

## Subida de archivos estáticos a S3

1. Genera los archivos estáticos del proyecto:
   ```bash
   npm run build
   ```

2. Suba los archivos generados en la carpeta `out` a un bucket de S3:
   ```bash
   aws s3 sync ./out s3://<NOMBRE_DEL_BUCKET> --delete
   ```

---

## Distribución con CloudFront

1. Configura una distribución de CloudFront que apunte al bucket S3 que contiene tus archivos estáticos.
2. Actualiza los registros DNS en tu dominio para apuntar a la URL de CloudFront.

### Comando para invalidar la caché de CloudFront (si es necesario):
```bash
aws cloudfront create-invalidation \
    --distribution-id <ID_DE_LA_DISTRIBUCION> \
    --paths "/*"
```

---

## Configuración de CI/CD con GitHub Actions

Para automatizar el despliegue de este proyecto, es recomendable configurar un pipeline de CI/CD utilizando GitHub Actions. A continuación, se describe un ejemplo básico de configuración:

1. Crea un archivo en `.github/workflows/deploy.yml` con el siguiente contenido:
   ```yaml
   name: CI/CD Pipeline

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout repository
         uses: actions/checkout@v3

       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: 18

       - name: Install dependencies
         run: npm install

       - name: Build project
         run: npm run build

       - name: Deploy to S3
         env:
           AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
           AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
           AWS_REGION: ${{ secrets.AWS_REGION }}
         run: |
           aws s3 sync ./out s3://<NOMBRE_DEL_BUCKET> --delete

       - name: Invalidate CloudFront cache
         env:
           AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
           AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
           AWS_REGION: ${{ secrets.AWS_REGION }}
         run: |
           aws cloudfront create-invalidation \
             --distribution-id <ID_DE_LA_DISTRIBUCION> \
             --paths "/*"
   ```

2. Configura los secretos necesarios en tu repositorio de GitHub:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

3. Confirma y sube los cambios. A partir de ahora, cualquier cambio en la rama `main` activará el pipeline de despliegue.

---

## Notas
- Recuerda actualizar el endpoint de la API Gateway en el archivo `.env` antes de desplegar el proyecto.
- Si haces cambios en los archivos estáticos, deberás regenerar, subirlos a S3 e invalidar la caché de CloudFront.



