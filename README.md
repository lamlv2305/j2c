# JSON to Swift Codable Struct

Why did you need ObjectMapper or hand-write struct/class with a ton of fields. Let your mac do it, let it auto-generate a sweet swift file with ready to use codable style.

## Getting Started

This project based on nodejs, so you need to install them. Get it here: https://nodejs.org/en/

### Prerequisites

Well, I really don't know what I should type here. Should I type it require a mac/pc to run ?

### Installing

Clone this project then

```
npm install -g
```

That's all! Quite easy.

## Running the tests

TODO

### Break down into end to end tests

TODO

## Get started

Example:
```
j2c -p .. -c ... -j
-c, --className: Your json file will be create with this file name
-p, --prefix: Prefix of swift struct
-j, --jsonFile: Name of example json file
```

Let focus on 3rd params, it's a name of json file, not PATH. I will make it to run with filepath on next version. But for now, you have to: `cd {your_path_to_example_json_file}` then type `j2c ....`


## Contributing

TODO

## Versioning

0.0.1 Beta

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
