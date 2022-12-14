# Torn React App

todo...

### branching

checkout new branch (should always be from `main`):
```sh
git checkout -b branch-name
```

commit changes and push:
```sh
git add --all .
git commit -m 'message'
git push # check output for suggested command if working on new branch
```

sync main branch (after a pull request has been merged):
```sh
git checkout main
git pull
```

delete branch:
```sh
git branch -d branch-name # use -D to force delete
```