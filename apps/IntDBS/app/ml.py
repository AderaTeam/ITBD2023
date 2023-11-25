
import torch
class RecGRUExample(torch.nn.Module):
    def __init__(
        self,
        size_of_sample: int,
        num_of_samples: int,
        output_size_of_input_layer: int,
        output_layer_size: int,
        alpha: float = 5
    ):
        
        super(RecGRUExample, self).__init__()
        self.alpha = alpha
        self.input_size_of_input_layer = size_of_sample
        self.output_size_of_input_layer = output_size_of_input_layer
        self.num_layers_of_input_layer = int(num_of_samples / (alpha * (self.input_size_of_input_layer + self.output_size_of_input_layer)))+1
        self.output_layer_size = output_layer_size
        self.num_of_samples = num_of_samples

        self.input_layer = torch.nn.GRU(
            input_size=self.input_size_of_input_layer,
            hidden_size=self.output_size_of_input_layer,
            num_layers=self.num_layers_of_input_layer,
            # bidirectional = True
        )
        self.output_layer = torch.nn.Conv1d(
            self.num_of_samples,
            self.output_layer_size,
            self.output_size_of_input_layer,
        )

        self.input_activation = torch.nn.Tanh()
        self.h1 = torch.zeros(self.num_layers_of_input_layer, self.num_of_samples, self.output_size_of_input_layer).double().to('cpu')

    def forward(self, x):
        y, h_r = self.input_layer(x, self.h1)
        # print(y.shape)
        y = self.input_activation(y)
        y = self.output_layer(y)
        return y.view(y.shape[0], y.shape[1])
