import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn import metrics
import numpy as np

n_clusters = 5
happy = {}
sad = {}

#read in data
data = pd.read_csv("redditAfinnScores.csv")

#test for data without the extreme values
moderateData = data[(data['afinnScore'] > -20) & (data['afinnScore'] < 20)]
scores = np.array(moderateData['afinnScore'])

#must be 2d for kmeans
scores2d = scores.reshape(-1,1)

#use elbow method to find ideal number of clusters
sum_of_squared_distances = []
K = range(1,15)
for k in K:
  k_means = KMeans(n_clusters=k)
  model = k_means.fit(scores2d)
  sum_of_squared_distances.append(k_means.inertia_)

#plot outcome of elbow method
plt.plot(K, sum_of_squared_distances, 'bx-')
plt.xlabel('k')
plt.ylabel('sum_of_squared_distances')
plt.title('find optimal k')
plt.show()

#run kmeans with the ideal number of clusters
k_means = KMeans(n_clusters = n_clusters).fit(scores2d)
#get clusters
clusters = k_means.predict(scores2d)

#add cluster to the data
moderateData.insert(2, "cluster", clusters, True)

for n in range(n_clusters):
  # Filter data points to plot each in turn.
  ys = scores[ clusters==n ]
  xs = scores[ clusters==n ]
  #get numbers of sad and happy posts for each cluster
  sad[n] = sum((moderateData['type'] == 'sad') & (moderateData['cluster'] == n))
  happy[n] = sum((moderateData['type'] == 'happy') & (moderateData['cluster'] == n))
  plt.scatter(xs, ys)

#plot points coloured by cluster
plt.title("Points by cluster")
plt.show()

#plot the centorids of each cluster
centroids = k_means.cluster_centers_
for n, y in enumerate(centroids):
  plt.plot(1, y, marker='x', ms=10)
plt.title('Kmeans cluster centroids')

plt.show()

print("number of posts that are happy by cluster : {}".format(happy))
print("number of posts that are sad by cluster : {}".format(sad))
