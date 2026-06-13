#!/usr/bin/env python
"""Seed 671 curriculum topics into Neon PostgreSQL."""
import json, os, sys

# Read the DATABASE_URL from .env to pass to prisma
# We'll use prisma db seed approach - generate a SQL insert file

with open('data/curriculum-full.json') as f:
    data = json.load(f)

topics = data['topics']
print(f"Loaded {len(topics)} curriculum topics")

# Generate Prisma seed script
lines = []
lines.append('import { PrismaClient } from "@prisma/client";')
lines.append('')
lines.append('const prisma = new PrismaClient();')
lines.append('')
lines.append('async function main() {')
lines.append('  console.log("Seeding curriculum topics...");')
lines.append('')

for t in topics:
    tags = json.dumps(t.get('tags', []))
    prereqs = json.dumps(t.get('prerequisites', []))
    title = t['title'].replace('"', '\\"')
    desc = t['description'].replace('"', '\\"')
    materials = t.get('materials', '').replace('"', '\\"')
    
    lines.append(f'  await prisma.curriculumTopic.upsert({{')
    lines.append(f'    where: {{ id: "{t["id"]}" }},')
    lines.append(f'    update: {{}},')
    lines.append(f'    create: {{')
    lines.append(f'      id: "{t["id"]}",')
    lines.append(f'      subject: "{t["subject"]}",')
    lines.append(f'      strand: "{t["strand"]}",')
    lines.append(f'      level: {t["level"]},')
    lines.append(f'      ageGroup: "{t["ageGroup"]}",')
    lines.append(f'      title: "{title}",')
    lines.append(f'      description: "{desc}",')
    lines.append(f'      category: "{t["category"]}",')
    lines.append(f'      estimatedSessions: {t.get("estimatedSessions", 2)},')
    lines.append(f'      tags: \'{tags}\',')
    lines.append(f'      prerequisites: \'{prereqs}\',')
    lines.append(f'      materials: "{materials}"')
    lines.append(f'    }}')
    lines.append(f'  }});')
    
    if (topics.index(t) + 1) % 100 == 0:
        lines.append(f'  console.log("  Seeded {topics.index(t)+1}/{len(topics)}...");')

lines.append('')
lines.append(f'  console.log("Seeded {len(topics)} curriculum topics");')
lines.append('}')
lines.append('')
lines.append('main().catch(console.error).finally(() => prisma.$disconnect());')

with open('prisma/seed-curriculum.ts', 'w') as f:
    f.write('\n'.join(lines))

print(f"Generated prisma/seed-curriculum.ts ({len(topics)} upserts)")
