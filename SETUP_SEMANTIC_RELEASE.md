# Semantic Release Setup Guide

## 🔧 การตั้งค่า Personal Access Token

### 1. สร้าง Personal Access Token
1. ไปที่ **GitHub Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. คลิก **Generate new token (classic)**
3. ตั้งค่า:
   - **Note**: `ERP Semantic Release Token`
   - **Expiration**: `No expiration` หรือ `1 year`
   - **Scopes**: เลือก:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
     - ✅ `write:packages` (Upload packages to GitHub Package Registry)
     - ✅ `delete:packages` (Delete packages from GitHub Package Registry)

### 2. เพิ่ม Token เป็น Repository Secret
1. ไปที่ **Repository** → **Settings** → **Secrets and variables** → **Actions**
2. คลิก **New repository secret**
3. ตั้งค่า:
   - **Name**: `PERSONAL_ACCESS_TOKEN`
   - **Secret**: วาง token ที่คัดลอกมา
4. คลิก **Add secret**

### 3. ตั้งค่า Repository Permissions
1. ไปที่ **Repository** → **Settings** → **Actions** → **General**
2. ในส่วน **Workflow permissions**:
   - เลือก **Read and write permissions**
   - เปิด **Allow GitHub Actions to create and approve pull requests**
3. คลิก **Save**

## 🚀 การทดสอบ

### ทดสอบใน Local
```bash
# ตั้งค่า environment variable
export GITHUB_TOKEN=your_personal_access_token_here

# รัน semantic-release
npx semantic-release --dry-run
```

### ทดสอบใน GitHub Actions
1. Push ไปยัง `main` branch
2. ดูผลลัพธ์ใน **Actions** tab
3. ตรวจสอบ **Releases** tab สำหรับ release ใหม่

## 📝 Commit Convention

ใช้ conventional commits เพื่อให้ semantic-release ทำงานได้ถูกต้อง:

```bash
# ฟีเจอร์ใหม่ (minor version)
git commit -m "feat: add user authentication"

# แก้ไข bug (patch version)
git commit -m "fix: resolve login issue"

# Breaking changes (major version)
git commit -m "feat!: change API structure"

# งาน maintenance (ไม่สร้าง release)
git commit -m "chore: update dependencies"

# เอกสาร (ไม่สร้าง release)
git commit -m "docs: update README"

# Tests (ไม่สร้าง release)
git commit -m "test: add unit tests"
```

## 🔍 Troubleshooting

### ปัญหา: Permission denied
- ตรวจสอบ Personal Access Token มี permissions ที่ถูกต้อง
- ตรวจสอบ Repository Secret ชื่อ `PERSONAL_ACCESS_TOKEN`
- ตรวจสอบ Repository permissions

### ปัญหา: No release created
- ตรวจสอบ commit messages ใช้ conventional commits
- ตรวจสอบ branch อยู่ใน `main` หรือ `develop`
- ตรวจสอบมี commits ใหม่ตั้งแต่ release ล่าสุด

### ปัญหา: Invalid repository URL
- ตรวจสอบ `.releaserc.json` มี `repositoryUrl` ถูกต้อง
- ตรวจสอบ repository เป็น public หรือมี access token ที่ถูกต้อง

## 📚 เอกสารเพิ่มเติม

- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
