- hosts: app
  become: true

  tasks:

    - name: Install Docker
      apt:
        name: docker.io
        state: present
        update_cache: yes

    - name: Start Docker
      service:
        name: docker
        state: started
        enabled: yes

    - name: Clone repo
      git:
        repo: "https://github.com/lgitacc01/timekeeping.git"
        dest: /root/timekeeping
        version: main
        force: yes

    # =========================
    # BACKEND
    # =========================
    - name: Build backend
      command: docker build -t backend /root/timekeeping/backend

    - name: Run backend
      command: docker run -d --restart=always --name backend -p 5000:5000 backend

    # =========================
    # FRONTEND (FIX TIMEOUT)
    # =========================
    - name: Build frontend (safe async)
      command: docker build -t frontend /root/timekeeping/frontend
      async: 600
      poll: 10

    - name: Run frontend
      command: docker run -d --restart=always --name frontend -p 5173:5173 frontend


# =========================
# LOAD BALANCER
# =========================
- hosts: lb
  become: true

  tasks:

    - name: Install Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Configure LB
      copy:
        dest: /etc/nginx/sites-available/default
        content: |
          upstream backend {
              server {{ app1_ip }}:5000;
              server {{ app2_ip }}:5000;
          }

          server {
              listen 80;

              location / {
                  proxy_pass http://backend;
              }
          }

    - name: Test Nginx
      command: nginx -t

    - name: Restart Nginx
      service:
        name: nginx
        state: restarted