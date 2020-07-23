weights -= learning_rate * jax.grad(cross_entropy_loss, (0))(weights, x, y)
cross_entropy_loss(weights, x, y) = -log(softmax(weights * x)[y]
