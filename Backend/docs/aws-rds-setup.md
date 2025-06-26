# ☁️ AWS RDS PostgreSQL Setup – Journey Cost App

This document summarizes the configuration used to provision a PostgreSQL database in AWS RDS for the Journey Cost backend project.

---

## ✅ RDS Configuration Summary

| Section               | Setting                    | Value / Notes                      |
| --------------------- | -------------------------- | ---------------------------------- |
| **Engine**            | Database Engine            | PostgreSQL                         |
|                       | Template                   | Free tier                          |
|                       | DB Instance Class          | `db.t3.micro` (Free Tier eligible) |
|                       | Storage Type               | General Purpose SSD (`gp2`)        |
|                       | Allocated Storage          | 20 GiB                             |
|                       | Storage Autoscaling        | Disabled                           |
| **Connectivity**      | Compute Resource           | Don't connect to EC2               |
|                       | Network Type               | IPv4                               |
|                       | VPC                        | Default                            |
|                       | Subnet Group               | Default                            |
|                       | Public Access              | Yes                                |
|                       | VPC Security Group         | Default (opened port 5432)         |
|                       | Availability Zone          | No preference                      |
| **Authentication**    | Method                     | Password authentication only       |
| **Monitoring**        | Performance Insights       | Enabled (7 days – Free Tier)       |
|                       | Enhanced Monitoring        | Disabled                           |
|                       | Log Exports                | PostgreSQL logs only               |
|                       | DevOps Guru                | Disabled                           |
| **Database Settings** | Initial Database Name      | `journeycost`                      |
|                       | DB Parameter Group         | default.postgresXX                 |
|                       | Option Group               | default:postgres-XX                |
| **Backups**           | Automated Backups          | Enabled                            |
|                       | Retention Period           | 1 day                              |
|                       | Backup Window              | No preference                      |
|                       | Backup Replication         | Disabled                           |
| **Encryption**        | Encryption at Rest         | Enabled (default AWS KMS key)      |
| **Maintenance**       | Auto Minor Version Upgrade | Enabled                            |
|                       | Maintenance Window         | No preference                      |
|                       | Deletion Protection        | Disabled                           |

---

## 📌 Notes

- Created using AWS Console (Free Tier)
- Used for learning full-stack and DevOps concepts
- Will be connected using Prisma and PostgreSQL

---

_Last updated: {{date}}_
