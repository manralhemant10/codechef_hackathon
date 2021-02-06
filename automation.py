import mysql.connector
import requests as re
import json
import time

offset = 0
with open('problems.json', 'r') as f:
        probs = json.load(f)
with open('taglist.json', 'r') as f:
        tags = json.load(f)
'''
delete = [key for key in probs if "tag" in probs[key]]
for key in delete: del probs[key]
with open('problems.json', 'w') as f:
        json.dump(probs, f)
'''
''' # get all problems
def get_token():
        j = {
                'grant_type' : 'client_credentials',
                "client_id":"805576e0d325ede6b17423e18349d00c",
                "client_secret":"655d1339e312cdc255013bb0d0437fa5",
                'redirect_uri':"https://developers.codechef.com/authorize/redirect"}
        resp = re.post('https://api.codechef.com/oauth/token', json=j)
        return resp.json()['result']['data']['access_token']
headers = {"Authorization": "Bearer " + get_token()}
with open('taglist.json', 'r') as f:
        tags = json.load(f)
f = False
for k in list(tags):
        if f or k == "tanmayanandx":
                f = True
        else:
                continue
        offset = 0
        while offset < tags[k]['count']:
                print(k)
                params = {'filter': k, 'limit': 100, 'offset': offset}
                resp = re.get('https://api.codechef.com/tags/problems', headers=headers, params=params)
                try:
                        data = resp.json()['result']['data']
                        probs.update(data['content'])
                        with open('problem.json', 'w') as f:
                                json.dump(probs, f)
                        offset += 100
                except:
                        try:
                                if resp.json()['result']['errors']['code'] == 9003:
                                        break
                        except:
                                pass
                        print(resp.json())
                        headers = {"Authorization": "Bearer " + get_token()}
                        time.sleep(30)
                        continue
'''
''' # get all tags
while (1):
        params = {'limit': 100, 'offset': offset}
        resp = re.get('https://api.codechef.com/tags/problems', headers=headers, params=params)
        print(resp.json())
        try:
                data = resp.json()['result']['data']
                taglist.update(data['content'])
                with open('taglist.json', 'w') as f:
                        json.dump(taglist, f)
                offset += 100
                if offset > 3100:
                        break
        except:
                headers = {"Authorization": "Bearer " + get_token()}
                time.sleep(30)
                continue

'''
'''
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="psubh"
)

mycursor = mydb.cursor()

sql = "INSERT INTO tags (tag_name, tag_count, tag_type) VALUES (%s, %s, %s)"
val = []
for k in tags:
        val.append((tags[k]['tag'], tags[k]['count'], tags[k]['type']))

mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "was inserted.")

'''
'''
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="psubh"
)

mycursor = mydb.cursor()

sql = "INSERT INTO problems(problem_code, problem_author, problem_solved, problem_attempted, problem_partially_solved) VALUES (%s,%s,%s,%s,%s)"
val = []
for k in probs:
        val.append((probs[k]['code'], probs[k]['author'], probs[k]['solved'],
                    probs[k]['attempted'], probs[k]['partiallySolved']))

mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "was inserted.")
'''
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="psubh"
)

mycursor = mydb.cursor()

sql = "INSERT INTO problem_tag(problem_id, tag_id) SELECT problem_id, tag_id FROM problems, tags WHERE problem_code = %s and tag_name = %s "
val = []
for k in probs:
        for t in probs[k]['tags']:
                val.append((k, t))
val = list(set(val))
mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "was inserted.")
