name: Deploy Multi-Tier App

on:
  push:
    branches:
      - deploy

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    # ======================
    # SSH
    # ======================
    - name: Setup SSH
      run: |
        mkdir -p ~/.ssh
        echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
        chmod 600 ~/.ssh/id_ed25519

    # ======================
    # TERRAFORM
    # ======================
    - uses: hashicorp/setup-terraform@v3

    - name: Terraform Init
      working-directory: terraform
      run: terraform init

    - name: Terraform Apply
      working-directory: terraform
      run: terraform apply -auto-approve -var="do_token=${{ secrets.DO_TOKEN }}"

    # ======================
    # GET IPS
    # ======================
    - name: Get IPs
      id: tf
      working-directory: terraform
      run: |
        echo "app1=$(terraform output -raw app1_ip)" >> $GITHUB_OUTPUT
        echo "app2=$(terraform output -raw app2_ip)" >> $GITHUB_OUTPUT
        echo "lb=$(terraform output -raw lb_ip)" >> $GITHUB_OUTPUT

    - name: Debug IPs
      run: |
        echo ${{ steps.tf.outputs.app1 }}
        echo ${{ steps.tf.outputs.app2 }}
        echo ${{ steps.tf.outputs.lb }}

    # ======================
    # WAIT SERVER READY (FIX SSH TIMEOUT)
    # ======================
    - name: Wait for servers
      run: sleep 120

    # ======================
    # INSTALL ANSIBLE
    # ======================
    - name: Install Ansible
      run: |
        sudo apt update
        sudo apt install -y ansible

    # ======================
    # INVENTORY
    # ======================
    - name: Create Inventory
      run: |
        echo "[app]" > ansible/inventory.ini
        echo "${{ steps.tf.outputs.app1 }} ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_ed25519" >> ansible/inventory.ini
        echo "${{ steps.tf.outputs.app2 }} ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_ed25519" >> ansible/inventory.ini

        echo "" >> ansible/inventory.ini

        echo "[lb]" >> ansible/inventory.ini
        echo "${{ steps.tf.outputs.lb }} ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_ed25519" >> ansible/inventory.ini

    # ======================
    # RUN ANSIBLE
    # ======================
    - name: Run Ansible
      env:
        ANSIBLE_HOST_KEY_CHECKING: False
      run: |
        ansible-playbook \
          -i ansible/inventory.ini \
          ansible/playbook.yml \
          --extra-vars "mongo_uri='${{ secrets.MONGO_URI }}' db_name='${{ secrets.DB_NAME }}' app1_ip='${{ steps.tf.outputs.app1 }}' app2_ip='${{ steps.tf.outputs.app2 }}'"