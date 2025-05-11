package com.example.heartDiseaseDiagnosis;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@Controller
public class PredictionController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("heartInput", new HeartInput());
        return "form";  // form.html
    }

    @PostMapping("/predict")
    public String predict(@ModelAttribute HeartInput heartInput, Model model) {
        double[] features = {
            heartInput.getAge(),
            heartInput.getSex(),
            heartInput.getCp(),
            heartInput.getTrestbps(),
            heartInput.getChol(),
            heartInput.getFbs(),
            heartInput.getRestecg(),
            heartInput.getThalach(),
            heartInput.getExang(),
            heartInput.getOldpeak(),
            heartInput.getSlope(),
            heartInput.getCa(),
            heartInput.getThal()
        };

        String jsonPayload = "{\"features\": " + java.util.Arrays.toString(features) + "}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        RestTemplate restTemplate = new RestTemplate();
        String pythonApiUrl = "http://localhost:5000/predict";

        ResponseEntity<String> response = restTemplate.postForEntity(pythonApiUrl, request, String.class);

        model.addAttribute("prediction", response.getBody());
        return "result";  // result.html
    }
}
