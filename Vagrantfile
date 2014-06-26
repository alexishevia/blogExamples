require 'json'

# ------------------------------ #
#         Config Values
# ------------------------------ #
#
# If you wish to override the default config values, create a JSON
# file called Vagrantfile.json on the same folder as this file
#

configValues = {
  # box to build from
  "box" => "Official Ubuntu 14.04 daily Cloud Image amd64 " +
           "(Development release, No Guest Additions)",

  # the url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system
  "box_url" => "https://cloud-images.ubuntu.com/vagrant/trusty/"    +
               "current/trusty-server-cloudimg-amd64-vagrant-disk1" +
               ".box",

  # private IP address for the VM
  "ip" => '192.168.60.2',

  # hostname for the VM
  "hostname" => "dev.nodejs"
}

if File.exist?('./Vagrantfile.json')
  begin
    configValues.merge!(JSON.parse(File.read('./Vagrantfile.json')))
  rescue JSON::ParserError => e
    puts "Error Parsing Vagrantfile.json", e.message
    exit 1
  end
end

# ------------------------------ #
#        Start Vagrant
# ------------------------------ #

Vagrant.configure("2") do |config|
  config.vm.box = configValues["box"]
  config.vm.box_url = configValues["box_url"]
  config.vm.network "private_network", ip: configValues['ip']
  config.vm.hostname = configValues['hostname']

  config.vm.provider :virtualbox do |vb|
    # This allows symlinks to be created within the /vagrant dir
    vb.customize ["setextradata", :id,
                  "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # install puppet and librarian-puppet
  config.vm.provision :shell, :path => "shell/install-puppet.sh"
  config.vm.provision :shell, :path => "shell/install-librarian-puppet.sh"

  # provision with Puppet stand alone
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "default.pp"
  end
end
